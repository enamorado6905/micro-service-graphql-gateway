import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ExceptionErrorMessageEnum } from '../enum/error/exception-error-message.enum';
import { LanguageClass } from '../util/class/language.class';

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
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_IS_BOOLEAN_DTO_ERROR_0002,
      {},
    );
  }
}
