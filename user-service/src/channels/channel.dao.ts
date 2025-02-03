import { eq } from 'drizzle-orm';

import { channels, db } from 'database-service/dist';
import { CreateChannelInput } from './dtos/createChannelInput.dto';
import { ChannelResponseDto } from './dtos/channelResponse.dto';
import { DeleteChannelInput } from './dtos/deleteChannelInput.dto';
import { UpdateChannelInput } from './dtos/updateChannelInput.dto';


export class ChannelDao {
  formatDateForMySQL(dateStr : string): string {
    const [day, month, year] = dateStr.split('-');
    const date = new Date(`${year}-${month}-${day}`);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  }
 
  async createChannelDao(input: CreateChannelInput) {
    console.log("in create block")
    try{
    
    const dataObj = {
      name: input.name,
      createdAt: new Date(),
      isDeleted: false,
    };
    const newChannel = await db.insert(channels).values(dataObj); // .returning() returns inserted row(s)
    if(newChannel[0].affectedRows !=0){
      return "ok done with status 200";
    }else{
      throw new Error("Check your data")
    }
     // Return the first inserted channel
   }catch(error){
    console.log(error)
    throw new Error('Database error !');
   }
   }



  async getChannelsDao():Promise<ChannelResponseDto[]> {
    try{
        const res = await db.select().from(channels) as ChannelResponseDto[];
        return res;
    }catch(error){
        console.log("error-->",error)
        throw new Error('Database error !');
    }
  }

  async deleteChannelDao(input: DeleteChannelInput):Promise<string>{
    try{
      const {id} = input
     const response = await db.delete(channels).where(eq(channels.id, id));
     console.log(response)
    
     if(response[0].affectedRows != 0){
         return `channel with if ${id} deleted successfully`
     }else{
      throw new Error(`channel id not found -> ${id}`)
     }
    }catch(error){
      throw new Error(`error in db with mesage -> ${error}`)
    }
  }
 
   async updateChannel(input: UpdateChannelInput): Promise<string>{
     try{
      const { id, name } = input;
      const channel = await db.select().from(channels).where(eq(channels.id, id)).limit(1)

     if (!channel) {
       throw new Error(`channel with id ${id} not found`);
     }
     const updated_data : Partial<UpdateChannelInput>= {
      
     }
     // Update only the fields that were provided in the input
     if (name !== undefined) updated_data['name'] = name;
     updated_data['modifiedAt'] = new Date()
    
     // Save the updated channel
         const response = await db.update(channels).set(updated_data).where(eq(channels.id,id));
         if(response[0].affectedRows != 0){
             return `channel of id  ${input.id} updated successfully`
         }else{
             throw new Error(`channel of id ${id} not updated`)
         
         }
     }catch(error){
      throw new Error('database error')
     }
    }
}
