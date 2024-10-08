import { IsNotEmpty, IsString } from 'class-validator';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';
import { Field, InputType } from '@nestjs/graphql';

/**
 * Data Transfer Object for creating authentication data.
 *
 * @class
 */
@InputType()
export class RefreshAuthDto {
  @Field(() => String, { nullable: true })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_REFRESH_ERROR_0001,
  })
  @IsNotEmpty()
  readonly refreshToken: string;
}
