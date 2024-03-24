import { Column, Entity } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from '../../../common/abstract-entity/abstract-entity.entity';
import { Paginated } from '../../../common/util/method/abstract-pagination-entity.method';

@Entity()
@ObjectType()
export class User extends AbstractEntity {
  @Column()
  @Field(() => String)
  readonly name: string;

  @Column()
  @Field(() => String)
  readonly surnames: string;

  @Column({
    unique: true,
  })
  @Field(() => String)
  readonly email: string;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  readonly isLocked: boolean;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  readonly isDisabled: boolean;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  readonly isVerified: boolean;
}

@ObjectType()
export class PaginatedAuthor extends Paginated(User) {}
