import { Column, Entity } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from '../../../common/abstract-entity/abstract-entity.entity';
import { Paginated } from '../../../common/util/method/abstract-pagination-entity.method';

@Entity()
@ObjectType()
export class ManagerPermission extends AbstractEntity {
  @Column({
    unique: true,
  })
  @Field(() => String)
  readonly name: string;

  @Column()
  @Field(() => String)
  readonly description: string;

  @Column({
    unique: true,
  })
  @Field(() => String)
  readonly path: string;

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
export class PaginatedManagerPermission extends Paginated(ManagerPermission) {}
