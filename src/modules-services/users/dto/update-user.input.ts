import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { UserEntityEnum } from '../../../common/enum/entity/user/user-language.enum';
import { IsEnum } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { nullable: true })
  readonly name?: string;

  @Field(() => String, { nullable: true })
  readonly email?: string;

  @Field(() => String, { nullable: true })
  readonly address?: string;

  @Field(() => String, { nullable: true })
  readonly surnames?: string;

  @Field(() => String, { nullable: true })
  @IsEnum(UserEntityEnum)
  readonly language?: UserEntityEnum;

  @Field(() => Boolean, { nullable: true })
  readonly isLocked?: boolean;

  @Field(() => Boolean, { nullable: true })
  readonly isDisabled?: boolean;

  @Field(() => Boolean, { nullable: true })
  readonly isVerified?: boolean;
}
