import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { AbstractEntity } from '../../../common/abstract-entity/abstract-entity.entity';
import { Paginated } from '../../../common/util/method/abstract-pagination-entity.method';
import { UserEntityEnum } from '../../../common/enum/entity/user/user-language.enum';

// UserDocument is a type that represents a User document in MongoDB.
export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User extends AbstractEntity {
  @Prop()
  @Field(() => String)
  readonly name: string;

  @Prop()
  @Field(() => String)
  readonly surnames: string;

  @Prop({ unique: true })
  @Field(() => String)
  readonly email: string;

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
  readonly language: string;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  readonly isLocked: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  readonly isDisabled: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  readonly isVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

@ObjectType()
export class PaginatedAuthor extends Paginated(User) {}
