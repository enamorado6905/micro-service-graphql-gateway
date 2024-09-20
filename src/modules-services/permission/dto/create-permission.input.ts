import { InputType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreatePermissionInput {
  @Field(() => String, {})
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  readonly name: string;

  @Field(() => String, {})
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  readonly resourcePath: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description: string;

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
