import { HttpException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDTO } from './DTO/register.user.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class UserService {
  private readonly saltRound: number;
  private readonly authMachineUrl: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly audience: string;
  private readonly grantType: string;
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private readonly configService: ConfigService,
  ) {
    this.saltRound = this.configService.get<number>('SALT_ROUND');
    this.authMachineUrl = this.configService.get<string>(
      'AUTH_MACHINE_TO_MACHINE_URL',
    );
    this.clientId = this.configService.get<string>('CLIENT_ID');
    this.clientSecret = this.configService.get<string>('CLIENT_SECRET');
    this.audience = this.configService.get<string>('AUDIENCE');
    this.grantType = this.configService.get<string>('GRANT_TYPE');
  }

  async findById(id: string): Promise<User> {
    return await this.UserModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.UserModel.findOne({ email }).exec();
  }

  // we will add a register via AUth0 and also backend
  // To differentiate between the two, we will add a field called registeredViaBackend BOOLEAN

  // async register(registerUserDTO: RegisterUserDTO): Promise<User> {
  //   if (await this.findByEmail(registerUserDTO.email)) {
  //     throw new HttpException('Email already exists', 409);
  //   }
  //   const user = new this.UserModel(registerUserDTO);
  //   const auth0User = await this.createAuth0User(
  //     registerUserDTO.email,
  //     registerUserDTO.password,
  //     registerUserDTO.username,
  //   );
  //   if (!auth0User) {
  //     throw new HttpException('Failed to create Auth0 user', 500);
  //   }
  //   user.auth0_id = auth0User.user_id;
  //   var salt = bcrypt.genSaltSync(10);
  //   console.log('🚀 ~ UserService ~ register ~ salt:', salt);
  //   var hashedPassword = bcrypt.hashSync(registerUserDTO.password, salt);
  //   console.log(
  //     '🚀 ~ UserService ~ register ~ hashedPassword:',
  //     hashedPassword,
  //   );
  //   user.password = hashedPassword;
  //   await user.save();
  //   return user;
  // }

  async registerUserViaBackend(
    registerUserDTO: RegisterUserDTO,
  ): Promise<User> {
    try {
      const duplicateUser = await this.findByEmail(registerUserDTO.email);
      if (duplicateUser && duplicateUser.registeredViaBackend) {
        throw new HttpException('Email already exists', 409);
      }
      const salt = bcrypt.genSaltSync(this.saltRound);
      const hashedPassword = bcrypt.hashSync(registerUserDTO.password, salt);
      const user = new this.UserModel({
        ...registerUserDTO,
        password: hashedPassword,
        registeredViaBackend: true,
        isEmailVerified: false,
      });
      await user.save();
      const cleanedUser = {
        email: user.email,
        username: user.username,
      };
      await this.saveDbUserToAuth0(cleanedUser);
      return user;
    } catch (error) {
      throw new HttpException(`failed to register user : ${error}`, 500);
    }
  }

  async saveDbUserToAuth0(registerUserDTO: RegisterUserDTO) {
    const accessToken = await this.getMachineToken();
    const response = await axios.post(
      `${this.audience}users`,
      {
        email: registerUserDTO.email,
        // password: registerUserDTO.password,
        username: registerUserDTO.username,
        connection: 'Username-Password-Authentication',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(response);
    return response.data;
  }

  async saveAuth0UserToDb(registerUserDTO: RegisterUserDTO): Promise<User> {
    try {
      const user = new this.UserModel({
        registerUserDTO,
        registeredViaBackend: false,
        isEmailVerified: true,
      });
      await user.save();
      return user;
    } catch (error) {
      throw new HttpException(
        `failed to register user to database: ${error}`,
        500,
      );
    }
  }

  async getMachineToken(): Promise<string> {
    try {
      const response = await axios.post(this.authMachineUrl, {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        audience: this.audience,
        grant_type: this.grantType,
      });
      return response.data.access_token;
    } catch (error) {
      throw new HttpException(
        `failed to get machine token : ${error.message}`,
        500,
      );
    }
  }

  async registerAuth0User(
    email: string,
    password: string,
    username: string,
  ): Promise<User> {
    try {
      const accessToken = await this.getMachineToken();
      const response = await axios.post(
        `${this.audience}users`,
        {
          email,
          // password,
          username,
          connection: 'Username-Password-Authentication',
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const dbUser = await this.saveAuth0UserToDb({
        email,
        password,
        username,
      });
      return dbUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(`failed to create auth0 user : ${error}`, 500);
    }
  }

  async getUserFromAuthId(auth0_id: string): Promise<User> {
    return await this.UserModel.findOne({ auth0_id }).exec();
  }
}
