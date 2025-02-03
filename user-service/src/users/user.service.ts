import { Injectable } from '@nestjs/common';

import { UserDao } from './user.dao';
import { UserResponseDto } from './dtos/Response.dto';
import { CreateUserInput } from './dtos/CreateInput.dto';
import { DeleteUserInput } from './dtos/DeleteInput.dto';
import { UpdateUserInput } from './dtos/UpdateInput.dto';


@Injectable()
export class UsersService {
  constructor(private readonly userDao: UserDao) {} // Inject `UserDao`

  async createUser(input: CreateUserInput) {
    return this.userDao.createUserDao(input);
  }

  async findUserByEmail(email: string): Promise<UserResponseDto[]> {
    return this.userDao.findUserByEmailDao(email);
  }

  async getUsers():Promise<UserResponseDto[]> {
    return this.userDao.getUsersDao();
  }

  async deleteUser(input: DeleteUserInput): Promise<string>{
    return this.userDao.deleteUserDao(input)
  }

  async updateUser(input: UpdateUserInput): Promise<string>{
    return this.userDao.updateUser(input)
  }
}
