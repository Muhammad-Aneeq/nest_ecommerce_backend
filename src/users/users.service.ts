import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getUsers() {
        return await this.usersRepository.getUsers()
    }

    async getUser(id: string) {
        return await this.usersRepository.getUserById(id)
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
      return await this.usersRepository.updateUser(id, updateUserDto)
    }

    async deleteUser(id: string) {
        return await this.usersRepository.deleteUser(id)
    }
}
