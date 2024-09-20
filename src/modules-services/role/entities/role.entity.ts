import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from '../../../common/abstract-entity/abstract-entity.entity';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Paginated } from '../../../common/util/method/abstract-pagination-entity.method';

@ObjectType()
export class Role extends AbstractEntity {
  @Prop({ required: true, unique: true })
  @Field(() => String)
  name: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Permission' }],
    required: false,
    default: [],
  })
  @Field(() => [String])
  permissions: Types.ObjectId[]; // Array of ObjectIds referencing the Permission collection

  @Prop({ default: false })
  @Field(() => Boolean)
  allPermission: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

@ObjectType()
export class PaginatedRole extends Paginated(Role) {}
