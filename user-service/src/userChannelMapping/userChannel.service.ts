import { Injectable } from '@nestjs/common';

import { AuthGaurdContextDto } from '../gaurds/authGuardContext.dto';
import { CreateUserChannelInput } from './dtos/createUserChannelInput.dto';
import { DeleteUserChannelInput } from './dtos/deleteUserChannelInput.dto';
import { UserChannelResponseDto } from './dtos/responseUserChannel.dto';
import { UpdateUserChannelInput } from './dtos/updateUserChannelInput.dto';
import { UserChannelDao } from './userChannel.dao';

@Injectable()
export class UserChannelService {
  constructor (private readonly userChannelDao: UserChannelDao) {} // Inject `UserChannelDao`

  async createUserChannelMapping (
    input: CreateUserChannelInput,
    context: AuthGaurdContextDto
  ): Promise<string> {
    return this.userChannelDao.createUserChannelMapppingDao(input, context);
  }

  async getUserChannelMapping (
    context: AuthGaurdContextDto
  ): Promise<UserChannelResponseDto[]> {
    return this.userChannelDao.getUsersChannelDao(context);
  }

  async deleteUserChannelMapping (
    input: DeleteUserChannelInput,
    context: AuthGaurdContextDto
  ): Promise<string> {
    return this.userChannelDao.deleteUserChannelDao(input, context);
  }

  async updateUserChannelMapping (
    input: UpdateUserChannelInput,
    context: AuthGaurdContextDto
  ): Promise<string> {
    return this.userChannelDao.updateUserChannel(input, context);
  }
}
