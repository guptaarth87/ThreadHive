import { eq } from 'drizzle-orm';

import { comments, db} from 'database-service/dist';
import { CreateCommentInput } from './dtos/createCommentInput.dto';
import { CommentResponseDto } from './dtos/commentResponse.dto';
import { DeleteCommentInput } from './dtos/deleteCommentInput.dto';
import { UpdateCommentInput } from './dtos/updateComment.dto';
import { Injectable } from '@nestjs/common';





@Injectable()
export class CommentDao {
 
 
  async createCommentDao(input: CreateCommentInput) {
    console.log("in create block")
    try{
  
    const dataObj = {   
      description: input.description,
      createdBy: input.createdBy,
      modifiedBy: input.createdBy,
      postId: input.postId,
      channelId: input.channelId,
      createdAt: new Date(),
      isDeleted: false,
    };
    const newComment = await db.insert(comments).values(dataObj); // .returning() returns inserted row(s)
    if(newComment[0].affectedRows !=0){
      return "ok done with status 200";
    }else{
      throw new Error("Check your data")
    }
     // Return the first inserted Comment
   }catch(error){
    console.log(error)
    throw new Error('Database error !');
   }
   }



  async getCommentsDao():Promise<CommentResponseDto[]> {
    try{
        const res = await db.select().from(comments) as CommentResponseDto[];
        return res;
    }catch(error){
        console.log("error-->",error)
        throw new Error('Database error !');
    }
  }

  async deleteCommentDao(input: DeleteCommentInput):Promise<string>{
    try{
      const {id} = input
     const response = await db.delete(comments).where(eq(comments.id, id));
     console.log(response)
    
     if(response[0].affectedRows != 0){
         return `Comment with if ${id} deleted successfully`
     }else{
      throw new Error(`Comment id not found -> ${id}`)
     }
    }catch(error){
      throw new Error(`error in db with mesage -> ${error}`)
    }
  }
 
   async updateComment(input: UpdateCommentInput): Promise<string>{
     try{
      const { id,description, channelId,postId , modifiedBy} = input;
      const Comment = await db.select().from(comments).where(eq(comments.id, id)).limit(1)

     if (!Comment) {
       throw new Error(`Comment with id ${id} not found`);
     }
     const updated_data : Partial<UpdateCommentInput>= {
      
     }
     // Update only the fields that were provided in the input
     if (postId!== undefined) updated_data['postId'] = postId;
     if (description !== undefined) updated_data['description'] = description;
     if (channelId !== undefined) updated_data['channelId'] = channelId // If password is provided, hash it
     updated_data['modifiedBy'] = modifiedBy;
     updated_data['modifiedAt']= new Date()
    
     // Save the updated Comment
         const response = await db.update(comments).set(updated_data).where(eq(comments.id,id));
         if(response[0].affectedRows != 0){
             return `Comment of id  ${input.id} updated successfully`
         }else{
             throw new Error(`Comment of id ${id} not updated`)
         
         }
     }catch(error){
      throw new Error('database error')
     }
    }
}
