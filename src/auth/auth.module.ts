import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService]
})
export class AuthModule {
  exports: [AuthGuard];
}
