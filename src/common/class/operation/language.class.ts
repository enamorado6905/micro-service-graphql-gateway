import { Injectable } from '@nestjs/common';
import { I18nService, I18nContext } from 'nestjs-i18n';
import { ExceptionErrorMessageEnum } from '../../enum/error/exception-error-message.enum';

@Injectable()
export class LanguageClass {
  constructor(private readonly i18n: I18nService) {}

  public language(
    code: string = 'exception.DEFAULT_MESSAGE',
    option: object,
  ): string {
    return this.i18n.t(`exception.${ExceptionErrorMessageEnum[code]}`, {
      lang: I18nContext.current().lang,
      args: { ...option },
    });
  }
}
