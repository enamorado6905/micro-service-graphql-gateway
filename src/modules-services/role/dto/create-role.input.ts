import { InputType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';

@InputType()
export class CreateRoleInput {
  @Field(() => String, {})
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  name: string;

  @Field(() => [ID], { nullable: true })
  @IsArray({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_ROLE_DTO_CREATED_ERROR_0001,
  })
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_ROLE_DTO_CREATED_ERROR_0002,
  })
  @IsMongoId({
    each: true,
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_ROLE_DTO_CREATED_ERROR_0003,
  })
  permissions: Types.ObjectId[];

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  allPermission?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isLocked?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isDisabled?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
