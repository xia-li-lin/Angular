import { TYPE_SELECTION } from './../../../../service/model/statistic.model';
import { Component, OnInit } from '@angular/core';
import { clickOnce, clickWaitHttp } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { StatisticService } from 'src/app/service/statistic.service';
import { DATE_SELECTION, DropDownOption, IsliCodeStatistic, SearchParams, times } from 'src/app/service/model';

@Component({
  selector: 'app-islicode-stat',
  templateUrl: './islicode-stat.component.html',
  styleUrls: [ './islicode-stat.component.scss' ]
})
export class IslicodeStatComponent implements OnInit {
  public isliCodeNumberTotal: number;
  public isliCodeStatistic: Array<IsliCodeStatistic>;
  public isliCodeTotal = 0;
  public onoff = true; // 展开/收缩开关
  public pagingBoxObj = new PagingBoxObj(1, 0, 10, 0);
  public searchParams = new SearchParams(
    times().endTime,
    '0',
    times().startTime,
    null,
    DATE_SELECTION.YEAR,
    TYPE_SELECTION.TIME
  );
  public spUserList: Array<DropDownOption>;

  constructor(private statisticServ: StatisticService) {}

  ngOnInit() {
    this.getSpUserList();
    this.getIsliCodeTotal();
    this.getIsliCodeStatistic();
  }

  // 获取ISLI编码统计
  getIsliCodeStatistic() {
    return this.statisticServ
      .getIsliCodeStatistic(this.searchParams)
      .success((success) => {
        this.isliCodeStatistic = success && success.data;
        this.isliCodeNumberTotal =
          this.isliCodeStatistic.reduce((total, item) => {
            return (total += Number(item.num));
          }, 0) || 0;
        this.pagingBoxObj.totalRecords = this.isliCodeStatistic && this.isliCodeStatistic.length;
      })
      .error((error) => {
        this.isliCodeStatistic = [];
        this.isliCodeNumberTotal = 0;
        this.pagingBoxObj.totalRecords = 0;
        console.error(error);
      });
  }

  // 获取sp用户列表
  getSpUserList() {
    return this.statisticServ
      .getSpUserList()
      .success((success) => {
        this.spUserList = success && success.data;
      })
      .error((error) => {
        this.spUserList = [];
        console.error(error);
      });
  }

  // 选择年月日
  @clickWaitHttp((searchParams: SearchParams) => 'handleDateChange' + searchParams.type)
  handleDateChange(searchParams: SearchParams) {
    this.onoff = true;
    this.pagingBoxObj.page = 1;
    this.pagingBoxObj.totalRecords = 0;
    this.searchParams = searchParams;
    return this.getIsliCodeStatistic();
  }

  // 导出表格
  @clickOnce('handleExportTableClick', 5000)
  handleExportTableClick() {
    return this.statisticServ.exportIsliCodeStatistic(this.searchParams);
  }

  // 切换分页
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;

    this.getIsliCodeStatistic();
  }

  // 搜索
  @clickWaitHttp('handleSearchClick')
  handleSearchClick(searchParams: SearchParams) {
    this.pagingBoxObj.page = 1;
    this.searchParams = searchParams;
    return this.getIsliCodeStatistic();
  }

  // 展开/收缩
  @clickOnce()
  handleToggleClick() {
    this.onoff = !this.onoff;
  }

  // 获取ISLI编码总量
  private getIsliCodeTotal() {
    this.statisticServ
      .getIsliCodeTotal()
      .success((success) => {
        const data = success && success.data;
        this.isliCodeTotal =
          data.reduce((total, item) => {
            return (total += Number(item.num));
          }, 0) || 0;
      })
      .error((error) => {
        this.isliCodeTotal = 0;
        console.error(error);
      });
  }
}
