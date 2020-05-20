import { AppState } from 'src/app/core';

export class Language {
  constructor(
    public languageId?: string,
    public langCode?: string,
    public langJava?: string,
    public langCountry?: string,
    public langName?: string,
    public isHided?: number // 0 显示 1隐藏
  ) {}
}

export enum STEP {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  LAST = 4
}

export function languageEnable(langCode: string) {
  const stateServ = new AppState();
  const languages =
    typeof stateServ.get('languageType') === 'string'
      ? JSON.parse(stateServ.get('languageType'))
      : stateServ.get('languageType');
  return languages.findIndex((elem) => elem.langCode === langCode) !== -1;
}
