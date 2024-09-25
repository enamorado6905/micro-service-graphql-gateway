import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from '../../../common/abstract/abstract-entity.entity';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Paginated } from '../../../common/util/method/abstract-pagination-entity.method';

@ObjectType()
export class Role extends AbstractEntity {
  @Field(() => String)
  @Prop({ required: true, unique: true })
  name: string;

  @Field(() => [String])
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Permission' }],
    required: false,
    default: [],
  })
  permissions: Types.ObjectId[];

  @Field(() => Boolean, { defaultValue: false })
  @Prop({ default: false })
  allPermission: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

@ObjectType()
export class PaginatedRole extends Paginated(Role) {}
