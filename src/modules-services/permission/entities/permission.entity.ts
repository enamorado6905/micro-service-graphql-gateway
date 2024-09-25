import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Paginated } from '../../../common/util/method/abstract-pagination-entity.method';
import { AbstractEntity } from '../../../common/abstract/abstract-entity.entity';

@ObjectType()
export class Permission extends AbstractEntity {
  @Prop({ required: true, unique: true })
  @Field(() => String) // A GraphQL field for the role's name.
  readonly name: string; // Immutable property

  @Prop({ required: true, unique: true })
  @Field(() => String) // A GraphQL field for the role's resourcePath.
  readonly resourcePath: string; // Immutable property

  @Prop({})
  @Field(() => String) // A GraphQL field for the role's name.
  description: string; // This property can still be modified
}

export const RoleSchema = SchemaFactory.createForClass(Permission);

@ObjectType()
export class PaginatedPermission extends Paginated(Permission) {}
