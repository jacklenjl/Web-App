import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {


    findOne(dto :any)
    {
        if(dto==="123")
        return 'valid';


        return 'invaild user';

    }


    checkhellomain()
    {
        return "this is check hello";
    }

}
