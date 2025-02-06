import { eq } from 'drizzle-orm';
import { Injectable } from '@nestjs/common';
import { comments, db } from 'database-service/dist';
import { CommentResponseDto } from './dtos/commentResponse.dto';
import { DeleteCommentInput } from './dtos/deleteCommentInput.dto';
import { UpdateCommentInput } from './dtos/updateComment.dto';

@Injectable()
export class CommentDao {
  async createCommentDao(input: typeof comments.$inferInsert) {
    console.log('in create block');
    try {
      const newComment = await db.insert(comments).values(input); // .returning() returns inserted row(s)
      if (newComment[0].affectedRows !== 0) {
        return 'ok done with status 200';
      }
      throw new Error('Check your data');

      // Return the first inserted Comment
    } catch (error) {
      console.log(error);
      throw new Error('Database error !');
    }
  }

  async getCommentsDao(): Promise<CommentResponseDto[]> {
    try {
      const response =
        (await db.query.comments.findMany()) as CommentResponseDto[];
      return response;
    } catch (error) {
      console.log('error-->', error);
      throw new Error('Database error !');
    }
  }

  async deleteCommentDao(input: DeleteCommentInput): Promise<string> {
    try {
      const { id } = input;
      const response = await db.delete(comments).where(eq(comments.id, id));
      console.log(response);

      if (response[0].affectedRows !== 0) {
        return `Comment with if ${id} deleted successfully`;
      }
      throw new Error(`Comment id not found -> ${id}`);
    } catch (error) {
      throw new Error(`error in db with mesage -> ${error}`);
    }
  }

  async updateComment(input: UpdateCommentInput): Promise<string> {
    try {
      const { id, description, channelId, postId, modifiedBy } = input;
      const Comment = await db
        .select()
        .from(comments)
        .where(eq(comments.id, id))
        .limit(1);

      if (!Comment) {
        throw new Error(`Comment with id ${id} not found`);
      }
      const updatedData: Partial<UpdateCommentInput> = {};
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

      // Save the updated Comment
      const response = await db
        .update(comments)
        .set(updatedData)
        .where(eq(comments.id, id));
      if (response[0].affectedRows !== 0) {
        return `Comment of id  ${input.id} updated successfully`;
      }
      throw new Error(`Comment of id ${id} not updated`);
    } catch (error) {
      throw new Error('database error');
    }
  }

  async canUserProceed(
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
