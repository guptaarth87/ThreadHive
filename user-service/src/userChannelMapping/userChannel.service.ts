import { Injectable } from '@nestjs/common';

import { CreateUserChannelInput } from './dtos/createUserChannelInput.dto';
import { UserChannelDao } from './userChannel.dao';
import { UserChannelResponseDto } from './dtos/responseUserChannel.dto';
import { DeleteUserChannelInput } from './dtos/deleteUserChannelInput.dto';
import { UpdateUserChannelInput } from './dtos/updateUserChannelInput.dto';



@Injectable()
export class UserChannelService {
  constructor(private readonly userChannelDao: UserChannelDao) {} // Inject `UserChannelDao`

  async createUserChannelMapping(input: CreateUserChannelInput) {
    return this.userChannelDao.createUserChannelMapppingDao(input);
  }



  async getUserChannelMapping():Promise<UserChannelResponseDto[]> {
    return this.userChannelDao.getUsersChannelDao();
  }

  async deleteUserChannelMapping(input: DeleteUserChannelInput): Promise<string>{
    return this.userChannelDao.deleteUserChannelDao(input)
  }

  async updateUserChannelMapping(input: UpdateUserChannelInput): Promise<string>{
    return this.userChannelDao.updateUserChannel(input)
  }
}
