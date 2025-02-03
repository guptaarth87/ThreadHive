import { eq } from 'drizzle-orm';

import { db, posts } from 'database-service/dist';
import { CreatePostInput } from './dtos/createPostInput.dto';
import { PostResponseDto } from './dtos/postResponse.dto';
import { DeletePostInput } from './dtos/deletePostInput.dto';
import { UpdatePostInput } from './dtos/updatePostInput.dto';



export class PostDao {
 
 
  async createPostDao(input: CreatePostInput) {
    console.log("in create block")
    try{
  
    const dataObj = {
      title: input.title,
      description: input.description,
      createdBy: input.createdBy,
      modifiedBy: input.createdBy,
      channelId: input.channelId,
      createdAt: new Date(),
      isDeleted: false,
    };
    const newpost = await db.insert(posts).values(dataObj); // .returning() returns inserted row(s)
    if(newpost[0].affectedRows !=0){
      return "ok done with status 200";
    }else{
      throw new Error("Check your data")
    }
     // Return the first inserted post
   }catch(error){
    console.log(error)
    throw new Error('Database error !');
   }
   }



  async getPostsDao():Promise<PostResponseDto[]> {
    try{
        const res = await db.select().from(posts) as PostResponseDto[];
        return res;
    }catch(error){
        console.log("error-->",error)
        throw new Error('Database error !');
    }
  }

  async deletePostDao(input: DeletePostInput):Promise<string>{
    try{
      const {id} = input
     const response = await db.delete(posts).where(eq(posts.id, id));
     console.log(response)
    
     if(response[0].affectedRows != 0){
         return `post with if ${id} deleted successfully`
     }else{
      throw new Error(`post id not found -> ${id}`)
     }
    }catch(error){
      throw new Error(`error in db with mesage -> ${error}`)
    }
  }
 
   async updatePost(input: UpdatePostInput): Promise<string>{
     try{
      const { id, title,description, channelId , modifiedBy} = input;
      const post = await db.select().from(posts).where(eq(posts.id, id)).limit(1)

     if (!post) {
       throw new Error(`post with id ${id} not found`);
     }
     const updated_data : Partial<UpdatePostInput>= {
      
     }
     // Update only the fields that were provided in the input
     if (title!== undefined) updated_data['title'] = title;
     if (description !== undefined) updated_data['description'] = description;
     if (channelId !== undefined) updated_data['channelId'] = channelId // If password is provided, hash it
     updated_data['modifiedBy'] = modifiedBy;
     updated_data['modifiedAt']= new Date()
    
     // Save the updated post
         const response = await db.update(posts).set(updated_data).where(eq(posts.id,id));
         if(response[0].affectedRows != 0){
             return `post of id  ${input.id} updated successfully`
         }else{
             throw new Error(`post of id ${id} not updated`)
         
         }
     }catch(error){
      throw new Error('database error')
     }
    }
}
