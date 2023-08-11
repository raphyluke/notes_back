// Create a service for the users module with login, register, and logout methods. I want also to implement google Oauth
import { GoogleOAuthGuard } from './google-oauth.guard';
import { Controller, Get, Request, UseGuards, Response } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('google')
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(@Request() req, @Response() res) {
        return this.usersService.googleLogin(req, res);
    }

    @Get('google/callback')
    @UseGuards(GoogleOAuthGuard)
    googleAuthRedirect(@Request() req, @Response() res) {
        return this.usersService.googleLogin(req, res);
    }
    
}
