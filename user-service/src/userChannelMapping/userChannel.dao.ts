import { eq } from 'drizzle-orm';
// Ensure correct import
import { db, usersChannelMapping } from 'database-service/dist';
import { CreateUserChannelInput } from './dtos/createUserChannelInput.dto';
import { UserChannelResponseDto } from './dtos/responseUserChannel.dto';
import { DeleteUserChannelInput } from './dtos/deleteUserChannelInput.dto';
import { UpdateUserChannelInput } from './dtos/updateUserChannelInput.dto';




export class UserChannelDao {
  
  async createUserChannelMapppingDao(input: CreateUserChannelInput) {
   
    try{
   
    const dataObj = {
     userId: input.userId,
     channelId: input.channelId
    };
    const newUser = await db.insert(usersChannelMapping).values(dataObj); // .returning() returns inserted row(s)
    if(newUser[0].affectedRows !=0){
     
      return "ok done with status 200";
    }else{
      throw new Error("Check your data")
    }
     // Return the first inserted user
   }catch(error){
    console.log(error)
    throw new Error('Database error !');
   }
   }

 
  async getUsersChannelDao():Promise<UserChannelResponseDto[]> {
    try{
        const res = await db.select().from(usersChannelMapping) as UserChannelResponseDto[];
        return res as UserChannelResponseDto[];
    }catch(error){
        console.log("error-->",error)
        throw new Error('Database error !');
    }
  }

  async deleteUserChannelDao(input: DeleteUserChannelInput):Promise<string>{
    try{
      const {id} = input
     const response = await db.delete(usersChannelMapping).where(eq(usersChannelMapping.id, id));
     console.log(response)
    
     if(response[0].affectedRows != 0){
         return `user mapping with if ${id} deleted successfully`
     }else{
      throw new Error(`user id not found -> ${id}`)
     }
    }catch(error){
      throw new Error(`error in db with mesage -> ${error}`)
    }
  }
 
   async updateUserChannel(input: UpdateUserChannelInput): Promise<string>{
     try{
      const { id, userId, channelId } = input;
      const user = await db.select().from(usersChannelMapping).where(eq(usersChannelMapping.id, id)).limit(1)

     if (!user) {
       throw new Error(`User with id ${id} not found`);
     }
     const updated_data : Partial<UpdateUserChannelInput>= {
      
     }
     // Update only the fields that were provided in the input
     if (userId !== undefined) updated_data['userId'] = userId;
     if (channelId !== undefined) updated_data['channelId'] = channelId;
     updated_data['modifiedAt'] = new Date()
    
     // Save the updated user
         const response = await db.update(usersChannelMapping).set(updated_data).where(eq(usersChannelMapping.id,id));
         if(response[0].affectedRows != 0){
             return `user mapping of id  ${input.id} updated successfully`
         }else{
             throw new Error(`user of id ${id} not updated`)
         
         }
     }catch(error){
      throw new Error('database error')
     }
    }
}
