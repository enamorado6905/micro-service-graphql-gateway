import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from '../../../common/abstract-entity/abstract-entity.entity';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Permission } from '../../permission/entities/permission.entity';
import { Types } from 'mongoose';
import { Paginated } from '../../../common/util/method/abstract-pagination-entity.method';

@ObjectType()
export class Role extends AbstractEntity {
  @Prop({ required: true, unique: true })
  @Field(() => String) // A GraphQL field for the role's name.
  readonly name: string; // Immutable property

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Permission', required: true }],
    required: true,
  })
  @Field(() => [Permission])
  permissions: [Permission]; // Array of ObjectIds referencing the Permission collection

  @Prop({ default: false })
  @Field(() => Boolean)
  allPermission: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

@ObjectType()
export class PaginatedRole extends Paginated(Role) {}
