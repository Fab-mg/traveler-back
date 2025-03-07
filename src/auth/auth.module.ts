import { forwardRef, Module } from '@nestjs/common';
// import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [JwtModule.register({}), forwardRef(() => UserModule)],
  providers: [AuthService],
  // exports: [AuthGuard],
})
export class AuthModule {}
