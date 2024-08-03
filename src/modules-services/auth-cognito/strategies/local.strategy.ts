import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CognitoServiceClass } from '../../../common/util/class/service/cognito.service.class';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly cognitoServiceClass: CognitoServiceClass) {
    super();
  }

  async validate(username: string, password: string) {
    console.log('LocalStrategy');
    console.log('username', username);
    console.log('password', password);
    // const data = await this.cognitoServiceClass.loginUserCognito({
    //   userName: username,
    //   password,
    // });

    // console.log('data', data);

    // if (!data) throw new UnauthorizedException();
    return true;
  }
}
