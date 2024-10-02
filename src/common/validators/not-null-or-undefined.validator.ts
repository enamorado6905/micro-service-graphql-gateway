import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ExceptionErrorMessageEnum } from '../enum/error/exception-error-message.enum';
import { LanguageClass } from '../class/operation/language.class';

@ValidatorConstraint({ name: 'NotNullOrUndefined', async: false })
export class NotNullOrUndefined implements ValidatorConstraintInterface {
  constructor(private readonly language: LanguageClass) {}

  validate(value: string | null) {
    console.log('value', value);
    return value !== null;
  }

  defaultMessage() {
    return this.language.language(
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_NOT_NULL_OR_UNDEFINED_ERROR_0001,
      {},
    );
  }
}
