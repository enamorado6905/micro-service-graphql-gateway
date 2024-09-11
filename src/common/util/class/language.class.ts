import { Injectable } from '@nestjs/common';
import { I18nService, I18nContext } from 'nestjs-i18n';

@Injectable()
export class LanguageClass {
  constructor(private readonly i18n: I18nService) {}

  public language(code: string, option: object): string {
    return this.i18n.t(code, {
      lang: I18nContext.current().lang,
      args: { ...option },
    });
  }
}
