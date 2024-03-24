import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  readonly name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly surnames: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  readonly isLocked?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  readonly isDisabled: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  readonly isVerified: boolean;
}
