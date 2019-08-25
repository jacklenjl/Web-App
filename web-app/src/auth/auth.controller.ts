import { Controller,Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

@Post('register')
regUser(@Body() dto)
{
    return this.authService.registerUser(dto);
}



}
