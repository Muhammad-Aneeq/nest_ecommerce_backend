import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, JWTSecret } from './constants';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWTSecret,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  providers: [
    AuthService
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
