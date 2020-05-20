import { Injectable } from '@angular/core';
import { HttpHookService, HTTP_HOOKS, RequestModel } from './http';
import { AppState } from './app-state.service';

@Injectable({ providedIn: 'root' })
export class LanguageAppendService {
  constructor(private httpHook: HttpHookService, private state: AppState) {
    httpHook.registerHttpHook(HTTP_HOOKS.HTTP_BEGIN, (req: RequestModel) => {
      req.queryParams = req.queryParams || {};
      if ('langCode' in req.queryParams) {
        return;
      }
      const langCode = state.get('language');
      if (langCode) {
        req.queryParams.langCode = langCode;
        req.queryParams.selectedLanguage = langCode;
      }
    });
  }
}
