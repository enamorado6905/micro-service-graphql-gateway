import { InputType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';
import { AbstractStatusInput } from '../../../common/dto/abstract-dto';
import { NotNullOrUndefined } from '../../../common/validators/not-null-or-undefined.validator';
import { IsBooleanNotRequeridingValue } from '../../../common/validators/is-boolean-not-requeriding-value.validator';

@InputType()
export class CreateRoleInput extends AbstractStatusInput {
  @Field(() => String, {})
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ROLE_CREATED_ERROR_0001,
  })
  @MaxLength(255, {
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ROLE_CREATED_ERROR_0002,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ROLE_CREATED_ERROR_0003,
  })
  readonly name: string;

  @Field(() => [ID], { nullable: true })
  @IsArray({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ROLE_CREATED_ERROR_0004,
  })
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ROLE_CREATED_ERROR_0005,
  })
  @IsMongoId({
    each: true,
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ROLE_CREATED_ERROR_0006,
  })
  readonly permissions: Types.ObjectId[];

  @Field(() => Boolean, { nullable: true })
  @Validate(NotNullOrUndefined, {
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ROLE_CREATED_ERROR_0007,
  })
  @Validate(IsBooleanNotRequeridingValue, {
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ROLE_CREATED_ERROR_0008,
  })
  readonly allPermission?: boolean;
}
