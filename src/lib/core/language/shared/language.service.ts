import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguageService {

  constructor(public translate: TranslateService) {

    const lang = this.getLanguage();
    this.translate.setDefaultLang(lang);
  }

  public getLanguage(): string {
    const browserLang = this.translate.getBrowserLang();
    return browserLang.match(/en|fr|zh_TW/) ? browserLang : 'en';
  }

  public setLanguage(language: string) {
      this.translate.use(language);
      this.translate.reloadLang(language);
  }
}
