export class UEditorConfig {
  options?: any;

  /**
   * 指定ueditor.js路径
   *
   *
   */
  path?: string;

  /**
   * Hook
   *
   *
   */
  hook?: any;

  // 用于标记hook是否已经注册完成
  // tslint:disable-next-line:whitespace
  // tslint:disable-next-line:variable-name
  _hook_finished? = false;
}
