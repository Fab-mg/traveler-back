import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/config/constants';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  // private readonly secret: string;
  private readonly audience: string;
  private readonly issuer: string;
  private readonly alg: string;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.alg = this.configService.get<string>('AUTH0_ALG');
    this.audience = this.configService.get<string>('AUTH0_AUDIENCE');
    this.issuer = this.configService.get<string>('AUTH0_ISSUER');
  }

  async getTokenFromRequest(req: Request): Promise<string> {
    try {
      return req.headers.authorization?.split(' ')[1];
    } catch (error) {
      return '';
    }
  }

  async validateToken(token: string): Promise<boolean> {
    if (!token || token.length <= 0) {
      return false;
    }
    const payload = await this.jwtService.verifyAsync(token, {
      // secret: this.secret,
      audience: this.audience,
      issuer: this.issuer,
      algorithms: [],
    });
    return true;
  }

  async validateTokenFromRequest(req: Request): Promise<boolean> {
    const token = await this.getTokenFromRequest(req);

    return true;
  }

  async verifyUserRole(token: string, role: Role): Promise<boolean> {
    const payload = await this.jwtService.verifyAsync(token, {
      // secret: this.secret,
      audience: this.audience,
      issuer: this.issuer,
      algorithms: [],
    });
    const user = await this.userService.getUserFromAuthId(payload.sub);
    if (user.role === role) {
      return true;
    }
    return false;
  }
}
