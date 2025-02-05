import { Injectable} from '@nestjs/common';

import { UserDao } from './user.dao';
import { UserResponseDto } from './dtos/response.dto';
import { CreateUserInput } from './dtos/createInput.dto';
import { DeleteUserInput } from './dtos/deleteInput.dto';
import { UpdateUserInput } from './dtos/updateInput.dto';
import { StatsResponseDto } from './dtos/statsResponse.dto';
import { userStatsDao } from './userStats.dao';
import { StatsUserInput } from './dtos/statsInput.dto';



@Injectable()
export class UsersService {
  constructor(
    private readonly userDao: UserDao,
    private readonly userStatsDao: userStatsDao
  ) {} // Inject `UserDao`

  async createUser(input: CreateUserInput) {
    return this.userDao.createUserDao(input);
  }

  async findUserByEmail(email: string): Promise<UserResponseDto[]> {
    return this.userDao.findUserByEmailDao(email);
  }


  async getUserStats(input: StatsUserInput):Promise<StatsResponseDto[]>{
    return this.userStatsDao.getUserPostStats(input)
  }
 
  async getUsers():Promise<UserResponseDto[]> {
    return this.userDao.getUsersDao();
  }

  async deleteUser(input: DeleteUserInput,role: string, channels?: [bigint]): Promise<string>{
    return this.userDao.deleteUserDao(input,role, channels)
  }

  async updateUser(input: UpdateUserInput): Promise<string>{
    return this.userDao.updateUser(input)
  }
}
