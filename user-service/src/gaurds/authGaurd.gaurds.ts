import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt'; 
import { db, users, usersChannelMapping } from 'database-service/dist';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
   
    private readonly jwtService: JwtService, // Inject JwtService to verify token
  ) {}

  async canActivate(context: any): Promise<boolean> {
    // const requested_service = context.args[3].fieldName
    // context = context as ExecutionContext
  
    const request= context.args[2] ;
    console.log(request.req)
    const token = request.req.raw?.headers.authorization;
    
    // Check if the token is provided
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    
    try {
      // Extract the JWT payload (email and roles)
    
      const decodedToken = this.jwtService.verify(token);
      
      
      const email = decodedToken.email;
      const role = decodedToken.role;
      const id = decodedToken.sub;
      // Query the database to check if the email and roles exist in the users table
      const user = await db.select().from(users).where(and(eq(users.email, email),(users.role, role)))

      if (!user) {
        throw new UnauthorizedException('Invalid email or roles');
      }

      // Attach user information to the request object (for use in other guards or controllers)
      request.email = email;
      request.role = role
      request.userId = id
      const getChannelIds = (data: { channelId: bigint }[]) => data.map(({ channelId }) => channelId);

      //write logic to extract list of channels he have accessed to admin
      if (role === 'ADMIN'){
         const channelsAccess = await db.select().from(usersChannelMapping).where(eq(usersChannelMapping.userId, id))
         request.channels = getChannelIds(channelsAccess)
      }
      // console.log("context req",context.a)
      return true; // Allow access if the user is found and roles match
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
