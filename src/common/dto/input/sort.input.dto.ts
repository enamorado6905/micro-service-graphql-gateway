import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { SortDescEnum } from '../../enum/system/sort.enum';

registerEnumType(SortDescEnum, {
  name: 'SortOrder',
});

@InputType()
class SortField {
  @Field(() => String)
  field: string;

  @Field(() => SortDescEnum)
  order: SortDescEnum;
}

@InputType()
export class SortInput {
  @Field(() => [SortField])
  fields: SortField[];
}
