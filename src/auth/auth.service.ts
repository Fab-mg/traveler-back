import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthService {
  private readonly secret: string;
  private readonly audience: string;
  private readonly issuer: string;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {
    this.secret = this.configService.get<string>('AUTH0_CLIENT_SECRET');
    this.audience = this.configService.get<string>('AUTH0_APP_AUDIENCE');
    this.issuer = this.configService.get<string>('AUTH0_APP_ISSUER');
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

    return true;
  }

  async validateTokenFromRequest(req: Request): Promise<boolean> {
    const token = await this.getTokenFromRequest(req);

    return true;
  }
}
