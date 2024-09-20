import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterByIdPermissionInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly _id: string;
}
