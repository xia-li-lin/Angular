import { Language } from '../language.model';

export class Contact {
  constructor(
    public contactId?: string,
    public contactKey?: string, // “联系我们"显示的KEY
    public contactValue?: string, // “联系我们”窗口中的值
    public langCode?: string,
    public seqDesc?: string, // 用于显示， 联系我们中信息的顺序
    public contactType?: string, // 类型
    public language?: Language
  ) {}
}
