import { Controller, Get, Post, Body, Res, Req, Render } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Cookies, SignedCookies, SetCookies, ClearCookies } from '@nestjsplus/cookies';



@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    regUser(@Body() dto) {
        return this.authService.registerUser(dto);
    }

    // @SetCookies({ name: 'Authorization', value: 'Bearer 123' })
    // @Post('test')
    // authHeaderSet() {
    //     return 'welcome';
    // }


    @Post('login')
    async set(@Body() dto, @Res() res: any): Promise<any> {

        var val: any = {};
        val = await this.authService.loginUser(dto);
        console.log("lllllll", val);
        if (val != undefined && val[0]) {
            res.cookie('Authorization', `Bearer ${val[0].tokenval} email ${val[0].email}`, { secure: false });
            res.end(`welcome`);
        }
        else {
            res.end("Wrong email or password");
        }

    }

    @Get('hello')
    sendHello(@Cookies() cookies) {
        console.log("cookie:", cookies);
        return "hello";
    }

    @ClearCookies('Authorization')
    @Get('kill')
    @Render('logout')
    kill(@Res() res: any, @Cookies() cookies) {
        return { message: 'cookies killed!' };

    }




}
