import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Roles } from 'src/auth/decorators';
import { Role } from './enums/role.enum';
import { RolesGuard } from 'src/auth/guards';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUser(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return await this.usersService.deleteUser(id);
  }
}
