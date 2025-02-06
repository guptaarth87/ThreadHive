import { eq } from 'drizzle-orm';

import { Injectable } from '@nestjs/common';
import { db, replies } from 'database-service/dist';
import { DeleteReplyInput } from './dtos/deleteReply.dto';
import { ReplyResponseDto } from './dtos/replyComment.dto';
import { UpdateReplyInput } from './dtos/updateReply.dto';

@Injectable()
export class ReplyDao {
  async createReplyDao (input: typeof replies.$inferInsert) {
    console.log('in create block');
    try {
      const newReply = await db.insert(replies).values(input); // .returning() returns inserted row(s)
      if (newReply[0].affectedRows !== 0) {
        return 'ok done with status 200';
      }
      throw new Error('Check your data');

      // Return the first inserted Reply
    } catch (error) {
      console.log(error);
      throw new Error('Database error !');
    }
  }

  async getRepliesDao (): Promise<ReplyResponseDto[]> {
    try {
      const response = (await db.select().from(replies)) as ReplyResponseDto[];
      return response;
    } catch (error) {
      console.log('error-->', error);
      throw new Error('Database error !');
    }
  }

  async deleteReplyDao (input: DeleteReplyInput): Promise<string> {
    try {
      const { id } = input;
      const response = await db.delete(replies).where(eq(replies.id, id));
      console.log(response);

      if (response[0].affectedRows !== 0) {
        return `Reply with if ${id} deleted successfully`;
      }
      throw new Error(`Reply id not found -> ${id}`);
    } catch (error) {
      throw new Error(`error in db with mesage -> ${error}`);
    }
  }

  async updateReply (input: UpdateReplyInput): Promise<string> {
    try {
      const { id, description, channelId, postId, modifiedBy } = input;
      const Reply = await db
        .select()
        .from(replies)
        .where(eq(replies.id, id))
        .limit(1);

      if (!Reply) {
        throw new Error(`Reply with id ${id} not found`);
      }
      const updatedData: Partial<UpdateReplyInput> = {};
      // Update only the fields that were provided in the input
      if (postId !== undefined) {
        updatedData.postId = postId;
      }
      if (description !== undefined) {
        updatedData.description = description;
      }
      if (channelId !== undefined) {
        updatedData.channelId = channelId;
      } // If password is provided, hash it
      updatedData.modifiedBy = modifiedBy;
      updatedData.modifiedAt = new Date();

      // Save the updated Reply
      const response = await db
        .update(replies)
        .set(updatedData)
        .where(eq(replies.id, id));
      if (response[0].affectedRows != 0) {
        return `Reply of id  ${input.id} updated successfully`;
      }
      throw new Error(`Reply of id ${id} not updated`);
    } catch (error) {
      throw new Error('database error');
    }
  }

  async canUserProceed (
    entityId: bigint,
    channelsAllowed: bigint[],
    userId: bigint,
    role: string
  ): Promise<boolean> {
    if (role === 'SUPERADMIN') {
      return true;
    }
    const record = await db.query.posts.findFirst({
      where: (posts, { eq }) => {
        return eq(posts.id, entityId);
      },
    });
    if (record) {
      if (role === 'ADMIN') {
        return channelsAllowed.includes(record.channelId);
      }
      return record.createdBy === userId;
    }
    return false;
  }
}
