import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';
import { AbstractEntity } from '../../../common/abstract-entity/abstract-entity.entity';
import { Paginated } from '../../../common/util/method/abstract-pagination-entity.method';
import { UserEntityEnum } from '../../../common/enum/entity/user/user-language.enum';
import { Role } from '../../role/entities/role.entity';

// UserDocument is a type that represents a User document in MongoDB.
export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User extends AbstractEntity {
  @Prop()
  @Field(() => String)
  name: string;

  @Prop()
  @Field(() => String)
  surnames: string;

  @Prop({ unique: true })
  @Field(() => String)
  email: string;

  @Prop({
    required: true,
    enum: [
      UserEntityEnum.LANGUAGE_CHINESE,
      UserEntityEnum.LANGUAGE_ENGLISH,
      UserEntityEnum.LANGUAGE_FRENCH,
      UserEntityEnum.LANGUAGE_GERMAN,
      UserEntityEnum.LANGUAGE_ITALIAN,
      UserEntityEnum.LANGUAGE_PORTUGUESE,
      UserEntityEnum.LANGUAGE_SPANISH,
      // Add more languages as needed
    ],
    default: UserEntityEnum.LANGUAGE_ENGLISH, // Default language is English.
  })
  @Field(() => String)
  language: string;

  @Prop({
    required: true,
    type: [{ type: Types.ObjectId, ref: 'Role' }], // Referencia a la colección de roles
  })
  @Field(() => [Role]) // Aquí aseguramos que GraphQL reconozca el tipo Role
  roles: Role[]; // Cambiamos a un array de la clase Role
}

export const UserSchema = SchemaFactory.createForClass(User);

@ObjectType()
export class PaginatedAuthor extends Paginated(User) {}
