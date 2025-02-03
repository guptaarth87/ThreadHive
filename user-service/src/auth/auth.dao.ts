import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { eq } from 'drizzle-orm';
import { users } from 'database-service/dist'; // Ensure correct import
import { db } from 'database-service/dist';
import { Injectable } from '@nestjs/common';
import { AuthResponse } from './auth-response.dto';

@Injectable()
export class AuthDao{

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        
      ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
        
        if (user && (await bcrypt.compare(password, user[0].password))) {
        
          const { password, ...result } = user[0];
         
          return result;
        }
        return null;
      }

      async login(user: any) {
        const payload = { email: user.email,role: user.role ,sub: user.id.toString() };
        
        return {
          access_token:this.jwtService.sign(payload),
          payload: payload
        };
      }

    async logUserIn(email: string, password: string): Promise<AuthResponse>{

        try{
            const user = await this.validateUser(email, password);
            if (!user) {
                 throw new Error('Invalid credentials');
              }
              const response = (await this.login(user))
              console.log(response)
              return  response as AuthResponse;
        }catch(error){
            console.log("error->",error)
            throw new Error('Loginn failed !');
        }
       
       }
     
}