import { eq } from 'drizzle-orm';

import { db, replies} from 'database-service/dist';
import { CreateReplyInput } from './dtos/createReply.dto';
import { ReplyResponseDto } from './dtos/replyComment.dto';
import { DeleteReplyInput } from './dtos/deleteReply.dto';
import { UpdateReplyInput } from './dtos/updateReply.dto';
import { Injectable } from '@nestjs/common';


@Injectable()
export class ReplyDao {
 
 
  async createReplyDao(input: CreateReplyInput) {
    console.log("in create block")
    try{
  
    const dataObj = {   
      description: input.description,
      createdBy: input.createdBy,
      modifiedBy: input.createdBy,
      commentId: input.commentId,
      postId: input.postId,
      channelId: input.channelId,
      createdAt: new Date(),
      isDeleted: false,
    };
    const newReply = await db.insert(replies).values(dataObj); // .returning() returns inserted row(s)
    if(newReply[0].affectedRows !=0){
      return "ok done with status 200";
    }else{
      throw new Error("Check your data")
    }
     // Return the first inserted Reply
   }catch(error){
    console.log(error)
    throw new Error('Database error !');
   }
   }



  async getReplysDao():Promise<ReplyResponseDto[]> {
    try{
        const res = await db.select().from(replies) as ReplyResponseDto[];
        return res;
    }catch(error){
        console.log("error-->",error)
        throw new Error('Database error !');
    }
  }

  async deleteReplyDao(input: DeleteReplyInput):Promise<string>{
    try{
      const {id} = input
     const response = await db.delete(replies).where(eq(replies.id, id));
     console.log(response)
    
     if(response[0].affectedRows != 0){
         return `Reply with if ${id} deleted successfully`
     }else{
      throw new Error(`Reply id not found -> ${id}`)
     }
    }catch(error){
      throw new Error(`error in db with mesage -> ${error}`)
    }
  }
 
   async updateReply(input: UpdateReplyInput): Promise<string>{
     try{
      const { id,description, channelId,postId , modifiedBy} = input;
      const Reply = await db.select().from(replies).where(eq(replies.id, id)).limit(1)

     if (!Reply) {
       throw new Error(`Reply with id ${id} not found`);
     }
     const updated_data : Partial<UpdateReplyInput>= {
      
     }
     // Update only the fields that were provided in the input
     if (postId!== undefined) updated_data['postId'] = postId;
     if (description !== undefined) updated_data['description'] = description;
     if (channelId !== undefined) updated_data['channelId'] = channelId // If password is provided, hash it
     updated_data['modifiedBy'] = modifiedBy;
     updated_data['modifiedAt']= new Date()
    
     // Save the updated Reply
         const response = await db.update(replies).set(updated_data).where(eq(replies.id,id));
         if(response[0].affectedRows != 0){
             return `Reply of id  ${input.id} updated successfully`
         }else{
             throw new Error(`Reply of id ${id} not updated`)
         
         }
     }catch(error){
      throw new Error('database error')
     }
    }
}
