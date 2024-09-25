import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ExceptionErrorMessageEnum } from '../enum/error/exception-error-message.enum';
import { LanguageClass } from '../util/class/language.class';

@ValidatorConstraint({ name: 'NotNullOrUndefined', async: false })
export class NotNullOrUndefined implements ValidatorConstraintInterface {
  constructor(private readonly language: LanguageClass) {}

  validate(value: string | null) {
    console.log('value', value);
    return value !== null;
  }

  defaultMessage() {
    return this.language.language(
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_NOT_NULL_OR_UNDEFINED_DTO_ERROR_0001,
      {},
    );
  }
}
