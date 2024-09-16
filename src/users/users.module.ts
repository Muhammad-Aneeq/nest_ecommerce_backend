import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { APP_GUARD } from 'src/auth/constants';
import { AuthGuard } from 'src/auth/guards';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    UsersService,
    UsersRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
