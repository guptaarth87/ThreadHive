import { eq } from 'drizzle-orm';
import { activities, users, usersChannelMapping } from 'database-service/dist'; // Ensure correct import
import { db } from 'database-service/dist';

import * as bcrypt from 'bcryptjs';
import { CreateUserInput } from './dtos/createInput.dto';
import { UserResponseDto } from './dtos/response.dto';
import { DeleteUserInput } from './dtos/deleteInput.dto';
import { UpdateUserInput } from './dtos/updateInput.dto';
import { UnauthorizedException } from '@nestjs/common';


export class UserDao {
  
 
  async createUserDao(input: CreateUserInput) {
    console.log("in create block")
    try{
    const hashedPassword = await bcrypt.hash(input.password, 10);
   
    const dataObj = {
      name: input.name,
      email: input.email,
      password: hashedPassword,
      role: input.role,
      dob: input.dob,
      createdAt: new Date(),
      isDeleted: false,
    };
    const newUser = await db.insert(users).values(dataObj); // .returning() returns inserted row(s)
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

  async findUserByEmailDao(email: string) {
    try{
      const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
      console.log(user)
      return user ; // Return null if not found
    }catch(error){
      console.log("error-->",error)
      throw new Error('Database error !');
    }
    
  }

  async getUsersDao():Promise<UserResponseDto[]> {
    try{
        const res = await db.select().from(users) as UserResponseDto[];
        return res;
    }catch(error){
        console.log("error-->",error)
        throw new Error('Database error !');
    }
  }

  async deleteUserDao(input: DeleteUserInput,role: string, channels?: [bigint]):Promise<string>{
    
    const {id} = input
    const userChannel =await db.select({"channelId": usersChannelMapping.channelId}).from(usersChannelMapping).where(eq(usersChannelMapping.userId, id))
    const userBelongsToChannel = userChannel[0].channelId
    if(role=='ADMIN' && !channels?.includes(userBelongsToChannel)) {
         throw new UnauthorizedException(
                 `You dont have rights to this channel of id ${userBelongsToChannel}`
    );
    }else{
    try{
      const {id} = input
     const response = await db.delete(users).where(eq(users.id, id));
     console.log(response)
    
     if(response[0].affectedRows != 0){
         return `user with if ${id} deleted successfully`
     }else{
      throw new Error(`user id not found -> ${id}`)
     }
    }catch(error){
      throw new Error(`error in db with mesage -> ${error}`)
    }
    }
  }
 
   async updateUser(input: UpdateUserInput): Promise<string>{
     try{
      const { id, name, email, password, role, dob } = input;
      const user = await db.select().from(users).where(eq(users.id, id)).limit(1)

     if (!user) {
       throw new Error(`User with id ${id} not found`);
     }
     const updated_data : Partial<UpdateUserInput>= {
      
     }
     // Update only the fields that were provided in the input
     if (name !== undefined) updated_data['name'] = name;
     if (email !== undefined) updated_data['email'] = email;
     if (password !== undefined) updated_data['password'] = await bcrypt.hash(password, 10); // If password is provided, hash it
     if (role !== undefined) updated_data['role'] = role;
     if (dob !== undefined) updated_data['dob'] = dob;
     updated_data['modifiedAt'] = new Date()
    
     // Save the updated user
         const response = await db.update(users).set(updated_data).where(eq(users.id,id));
         if(response[0].affectedRows != 0){
             return `user of id  ${input.id} updated successfully`
         }else{
             throw new Error(`user of id ${id} not updated`)
         
         }
     }catch(error){
      throw new Error('database error')
     }
    }
}
