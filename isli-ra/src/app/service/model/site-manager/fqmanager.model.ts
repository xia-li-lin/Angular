export class FqManager {
  constructor(
    public questionId?: number,
    public title?: string,
    public questioner?: string,
    public imgUrl?: string,
    public imgName?: string,
    public questionDesc?: string,
    /**
     * 0 隐藏 1 显示
     */
    public isShow?: number,
    public createTime?: string,
    public updateTime?: string,
    /**
     * 回复数量
     */
    public replayNum?: number,
    public keyword?: string,
    public sortField?: string,
    public startTime?: string,
    public endTime?: string,
    public langCode?: string,
    /**
     * 0不置顶 1置顶
     */
    public topSort?: number,
    public isTop?: boolean,
    /**
     * 是否存在为查看的新数据
     */
    public isExistNewData?: number
  ) {}
}

export class FqManagerReplay {
  constructor(
    public id?: number,
    /**
     * 问题id
     */
    public questionId?: number,
    /**
     * 回答者
     */
    public replayer?: string,
    public replayContent?: string,
    public createTime?: string,
    public updateTime?: string,
    public sort?: number,
    /**
     * 是否显示 0不显示 1不显示
     */
    public isShow?: number,
    /**
     * 0不置顶 1置顶
     */
    public topSort?: number,
    public isTop?: boolean
  ) {}
}

export class FqManagerSearch {
  constructor(
    public startTime?: string,
    public endTime?: string,
    public keyWord?: string,
    public langCode?: string,
    public isShow?: 0 | 1,
    public sortField?: string
  ) {}
}
