export class FeedBackType {
  constructor(
    /**
     * 主键
     */
    public id?: number,
    /**
     * 反馈类型ID
     */
    public feedbackTypeId?: number,
    /**
     * 反馈类型名称
     */
    public feedbackTypeName?: string,
    /**
     * 反馈类型语种
     */
    public langCode?: string
  ) {}
}

export class PlatformFile {
  constructor(
    /**
     * 文件PK
     */
    public fileId?: number,
    /**
     * 上传文件是系统为文件生成的 UUID，使用uuid获取文件
     */
    public fileUuid?: string,
    /**
     * 文件大小（字节）
     */
    public fileSize?: number,
    /**
     * 文件后缀
     */
    public fileSuffix?: string,
    /**
     * 文件的原始名称 *
     */
    public fileName?: string,
    public filePath?: string,
    /**
     * 文件的MD5值，文件指纹
     */
    public fileMd5?: string
  ) {}
}

export class FeedBack {
  constructor(
    /**
     * 主键
     */
    public feedbackId?: number,
    /**
     * 反馈类型ID
     */
    public feedbackTypeId?: number,
    /**
     * 附件
     */
    public fileName?: string,
    /**
     * 反馈图片uuid
     */
    public feedbackPicUuid?: string,
    /**
     * 反馈意见状态
     */
    public feedbackStatus?: number,
    public updatetime?: string,
    /**
     * 反馈类型
     */
    public feedbackType?: FeedBackType,
    /**
     * 附件图片
     */
    public imageFile?: PlatformFile,
    /**************** 查询字段 **********************/

    /**
     * 开始时间
     */
    public startTime?: string,
    /**
     * 结束时间
     */
    public endTime?: string,
    /**
     * 开始条数
     */
    public startSize?: number,
    /**
     * 结束条数
     */
    public endSize?: number,
    /**
     * 反馈类型的语种
     */
    public langCode?: string,
    public userEmail?: string,
    public userName?: string,
    public feedbackName?: string,
    public title?: string,
    public feedbackContent?: string,
    public updateDatetime?: string,
    public status?: number,
    public dealOpinion?: string,
    public jobNo?: string
  ) {}
}

export class FeedBackSearch {
  constructor(
    public startTime?: string,
    public endTime?: string,
    public title?: string,
    public feedbackTypeId?: number,
    public feedbackStatus?: number
  ) {}
}
