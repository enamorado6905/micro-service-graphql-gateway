import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { toNumber } from '../../helpers/cast.helper';

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
  @Field(() => Date, { nullable: true })
  readonly query?: object;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  readonly projection?: object;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  readonly sort?:
    | string
    | { [key: string]: any | { $meta: any } }
    | [string, any][]
    | undefined
    | null;

  @IsOptional()
  readonly select?: Array<string> | string = [];

  @IsOptional()
  readonly paginated?: string;

  /**
   * Indicates whether pagination is enabled.
   * Default value: true
   */
  @Field(() => Boolean, { defaultValue: true })
  @IsBoolean()
  @IsOptional()
  readonly isPaginate?: boolean;
}
