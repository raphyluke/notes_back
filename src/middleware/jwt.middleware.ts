import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the "Authorization" header
    
    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        req['user'] = decoded; // Attach the decoded user object to the request
      } catch (error) {
        // Handle token verification error, e.g., token expired or invalid
      }
    }

    next(); // Continue processing the request
  }
}