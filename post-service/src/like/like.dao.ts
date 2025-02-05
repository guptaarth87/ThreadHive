import { eq ,and} from 'drizzle-orm';

import { db, likes} from 'database-service/dist';
import { LikeResponseDto } from './dtos/likeResponse.dto';
import { LikeEventInput } from './dtos/likeEventInput.dto';
import { Injectable } from '@nestjs/common';





@Injectable()
export class LikesDao {
 
 
  async likeToggleDao(input: LikeEventInput): Promise<string> {
    console.log("in create block")
    try{

    const inputObj = {   
        type: input.type,
        typeId: input.typeId,
        likedBy: input.likedBy,
        postId: input.postId,
        count: 1,
        channelId: input.channelId,
        createdAt: new Date(),
      };
    const response = await db.select()
                     .from(likes)
                     .where(
                      and(
                        eq(likes.type, inputObj.type),
                        eq(likes.typeId, inputObj.typeId), 
                        eq(likes.likedBy, inputObj.likedBy),
                        eq(likes.postId, inputObj.postId),
                        eq(likes.channelId, inputObj.channelId)
                      )
                    )
    if (response.length > 0){
     const delete_status = await db.delete(likes)
      .where(
       and(
         eq(likes.type, inputObj.type),
         eq(likes.typeId, inputObj.typeId), 
         eq(likes.likedBy, inputObj.likedBy),
         eq(likes.postId, inputObj.postId),
         eq(likes.channelId, inputObj.channelId)
       )
     )
     console.log(delete_status)
     return `${inputObj.type} of id -> ${inputObj.typeId} unliked`
    }else{
      const liked_status = await db.insert(likes).values(inputObj)
      console.log(liked_status)
       return `liked ${inputObj.type}`
    }
   }catch(error){
    console.log(error)
    throw new Error('Database error !');
   }
   }



  async getLikesDao():Promise<LikeResponseDto[]> {
    try{
        const res = await db
        .select()
        .from(likes) as LikeResponseDto[];

        return res  ;
    }catch(error){
        console.log("error-->",error)
        throw new Error('Database error !');
    }
  }

 
}
