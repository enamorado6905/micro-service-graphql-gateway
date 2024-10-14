import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';
import { ExceptionErrorMessageEnum } from '../enum/error/exception-error-message.enum';

@InputType()
export abstract class AbstractStatusInput {
  @Field(() => Boolean, { nullable: true })
  @IsBoolean({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ABSTRACT_STATUS_ERROR_0001,
  })
  @IsOptional()
  readonly isLocked?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ABSTRACT_STATUS_ERROR_0002,
  })
  @IsOptional()
  readonly isDisabled?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ABSTRACT_STATUS_ERROR_0003,
  })
  @IsOptional()
  readonly isVerified?: boolean;
}
