import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { AbstractEntity } from '../../../common/class/abstract/abstract-entity.entity';
import { PaginationClass } from '../../../common/class/operation/pagination.class';

// OrganizationDocument is a type that represents a Organization document in MongoDB.
export type OrganizationDocument = Organization & Document;

@Schema()
@ObjectType()
export class Organization extends AbstractEntity {
  @Prop()
  @Field(() => String)
  name: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);

@ObjectType()
export class PaginatedOrganization extends PaginationClass.Paginated(
  Organization,
) {}
