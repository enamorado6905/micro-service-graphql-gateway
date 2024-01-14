import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Represents an abstract entity with common fields such as ID, creation date, update date, and status.
 */
@Entity()
@ObjectType()
export abstract class AbstractEntity {
  /**
   * ID of the entity, unique globally.
   */
  @Field(() => ID)
  @ApiProperty({ description: 'ID of the entity, unique globally.' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  /**
   * Date when the entity instance was created.
   */
  @Field(() => Date)
  @ApiProperty({
    description: 'Date when the entity instance was created.',
  })
  @CreateDateColumn()
  readonly created_at: Date;

  /**
   * Date when the entity instance was last updated.
   */
  @Field(() => Date)
  @ApiProperty({
    description: 'Date when the entity instance was last updated.',
  })
  @UpdateDateColumn()
  readonly updated_at: Date;

  /**
   * Status of the entity instance.
   */
  @Field(() => Boolean)
  @ApiProperty({
    description: 'Status of the entity instance.',
  })
  @Column({ default: false })
  readonly status: boolean;
}
