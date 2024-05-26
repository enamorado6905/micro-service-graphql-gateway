import { Prop, Schema } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Represents an abstract entity with common fields such as ID, creation date, update date, and status.
 */
@Schema()
@ObjectType()
export abstract class AbstractEntity {
  /**
   * ID of the entity, unique globally.
   */
  @Field(() => ID)
  @ApiProperty({ description: 'ID of the entity, unique globally.' })
  readonly _id: string;

  /**
   * A flag indicating whether the entity instance is locked.
   */
  @Field(() => Boolean, { defaultValue: false })
  @Prop({ default: false })
  readonly isLocked: boolean;

  /**
   * A flag indicating whether the entity instance is disabled.
   */
  @Field(() => Boolean, { defaultValue: false })
  @Prop({ default: false })
  readonly isDisabled: boolean;

  /**
   * A flag indicating whether the entity instance is verified.
   */
  @Field(() => Boolean, { defaultValue: false })
  @Prop({ default: false })
  readonly isVerified: boolean;

  /**
   * Date when the entity instance was created.
   */
  @Field(() => String)
  @ApiProperty({
    description: 'Date when the entity instance was created.',
  })
  readonly createdAt: string;

  /**
   * Date when the entity instance was last updated.
   */
  @Field(() => String)
  @ApiProperty({
    description: 'Date when the entity instance was last updated.',
  })
  readonly updatedAt: string;
}
