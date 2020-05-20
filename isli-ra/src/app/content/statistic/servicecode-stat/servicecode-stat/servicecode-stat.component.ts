import { Component, OnInit } from '@angular/core';
import { AppState, clickOnce, clickWaitHttp, CommonFuncService } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { StatisticService } from 'src/app/service/statistic.service';
import { DATA_TYPE, DropDownOption, ServiceCodeSearchParams } from 'src/app/service/model';

@Component({
  selector: 'app-servicecode-stat',
  templateUrl: './servicecode-stat.component.html',
  styleUrls: [ './servicecode-stat.component.scss' ]
})
export class ServicecodeStatComponent implements OnInit {
  public dataType = DATA_TYPE;
  public onoff = true;
  public pagingBoxObj = new PagingBoxObj(1, 0, 10, 0);
  public serviceCodeList: Array<any>;
  public serviceCodeSearchParams = new ServiceCodeSearchParams(DATA_TYPE.SP);
  public serviceCodeTotal = 0;
  public spUserList: Array<DropDownOption>;
  public total: number;

  constructor(private statisticServ: StatisticService, private stateServ: AppState) {}

  ngOnInit() {
    this.getServiceCode();
    this.getSpUserList();
  }

  // 获取服务登记统计
  getServiceCode() {
    return this.statisticServ
      .getServiceCode(this.serviceCodeSearchParams)
      .translate(CommonFuncService.formatObjForLangCode(this.stateServ.get('language')))
      .success((success) => {
        this.serviceCodeList = success && success.data;
        this.pagingBoxObj.totalRecords = this.serviceCodeList && this.serviceCodeList.length;
        this.serviceCodeTotal = this.getServiceCodeTotal(this.serviceCodeList);
      })
      .error((error) => {
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
        console.error(error);
      });
  }

  // 导出表格
  @clickOnce('handleExportTableClick', 5000)
  handleExportTableClick() {
    return this.statisticServ.exportServiceCode(this.serviceCodeSearchParams);
  }

  // 切换分页
  handlePageClick(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;

    this.getServiceCode();
  }

  // 搜索
  @clickWaitHttp('handleSearchClick')
  handleSearchClick(serviceCodeSearchParams: ServiceCodeSearchParams) {
    this.serviceCodeSearchParams = serviceCodeSearchParams;
    this.pagingBoxObj.page = 1;
    return this.getServiceCode();
  }

  // 展开/收缩
  @clickOnce()
  handleToggleClick() {
    this.onoff = !this.onoff;
  }

  // 切换tab
  @clickWaitHttp('handleTypeChange')
  handleTypeChange(serviceCodeSearchParams: ServiceCodeSearchParams) {
    this.onoff = true;
    this.pagingBoxObj.page = 1;
    this.pagingBoxObj.totalRecords = 0;
    this.serviceCodeSearchParams = serviceCodeSearchParams;
    return this.getServiceCode();
  }

  // 获取数据总条数
  private getServiceCodeTotal(data) {
    return (
      data.reduce((total, item) => {
        return (total += item.num);
      }, 0) || 0
    );
  }
}
