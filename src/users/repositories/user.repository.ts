import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, roles } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      roles,
    });

    if (!user) throw new BadRequestException('400 user was not created');

    return user;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('400 User not found!');

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new NotFoundException('400 User not found!');

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true, runValidators: true },
    );

    if (!updatedUser) throw new BadRequestException('400 user was not updated');

    return updatedUser;
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser) throw new BadRequestException('400 user was not deleted');

    return { message: 'user deleted successfully!' };
  }
}
