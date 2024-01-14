import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

/**
 * Data transfer object for search arguments.
 */
@ArgsType()
export class SearchArgsDto {
  /**
   * The search query.
   */
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  readonly search?: string;
}
