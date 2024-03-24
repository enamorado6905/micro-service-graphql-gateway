import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { toNumber } from '../../helpers/cast.helper';
import { QueryInput } from '../input/query.input.dto';
import { SortInput } from '../input/sort.input.dto';
import { PopulateInput } from '../input/populate.input.dto';

/**
 * Represents the pagination arguments for retrieving a list of items.
 */
@ArgsType()
export class PaginationArgsDto {
  /**
   * The number of items per page.
   * Default value: 10
   * Minimum value: 10
   */
  @Field(() => Int, { nullable: true })
  @Transform(({ value }) => toNumber(value, { default: 10, min: 10 }))
  @IsOptional()
  @IsNumber()
  readonly limit?: number = 10;

  /**
   * The page number.
   * Default value: 0
   * Minimum value: 0
   */
  @Field(() => Int, { nullable: true })
  @Transform(({ value }) => toNumber(value, { default: 0, min: 0 }))
  @IsOptional()
  @IsNumber()
  readonly page?: number = 0;

  @IsOptional()
  @Field(() => QueryInput, { nullable: true })
  readonly query: QueryInput;

  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly select?: string;

  @IsOptional()
  @Field(() => SortInput, { nullable: true })
  sort?: SortInput;

  @IsOptional()
  @Field(() => [PopulateInput], { nullable: true })
  populate?: PopulateInput[];

  @Field(() => Boolean, { defaultValue: true })
  @IsBoolean()
  @IsOptional()
  readonly isPaginate?: boolean;
}
