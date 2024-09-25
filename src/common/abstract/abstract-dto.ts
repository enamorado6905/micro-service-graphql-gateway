import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';
import { ExceptionErrorMessageEnum } from '../enum/error/exception-error-message.enum';

@InputType()
export abstract class AbstractStatusInput {
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_ABSTRACT_STATUS_DTO_ERROR_0001,
  })
  isLocked?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_ABSTRACT_STATUS_DTO_ERROR_0002,
  })
  isDisabled?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_ABSTRACT_STATUS_DTO_ERROR_0003,
  })
  isVerified?: boolean;
}
