import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ExceptionErrorMessageEnum } from '../enum/error/exception-error-message.enum';
import { LanguageClass } from '../class/operation/language.class';

@ValidatorConstraint({ name: 'IsBooleanNotRequeridingValue', async: false })
export class IsBooleanNotRequeridingValue
  implements ValidatorConstraintInterface
{
  constructor(private readonly language: LanguageClass) {}

  validate(value: boolean | null | undefined) {
    if (value === null || value === undefined) {
      return true;
    }

    /**
     * requeriding boolean value
     */
    return typeof value === 'boolean';
  }

  defaultMessage() {
    return this.language.language(
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_IS_BOOLEAN_ERROR_0001,
      {},
    );
  }
}
