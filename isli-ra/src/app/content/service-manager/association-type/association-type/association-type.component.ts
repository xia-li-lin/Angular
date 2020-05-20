import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState, clickOnce, clickWaitHttp, CommonFuncService } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { ServiceAssociationService } from 'src/app/service/service.association.service';
import { AssicuationSearch, DropDownOption, PageSearch, RelevanceTypeInfo } from 'src/app/service/model';

@Component({
  selector: 'app-association-type',
  templateUrl: './association-type.component.html',
  styleUrls: [ './association-type.component.scss' ]
})
export class AssociationTypeComponent implements OnInit {
  public assicuationSearch = new AssicuationSearch();
  public associationTypeList: RelevanceTypeInfo[];
  public oldAssicuationSearch: AssicuationSearch;
  public pagingBoxObj = new PagingBoxObj(1, 0, 10, 0);
  public sourceTypeList: Array<DropDownOption>;
  public targetTypeList: Array<DropDownOption>;

  constructor(
    private router: Router,
    private serviceAssociationServ: ServiceAssociationService,
    private stateServ: AppState
  ) {}

  ngOnInit() {
    this.getAssociationList();
    this.getSourceAndTargetType();
  }

  // 获取源类型,目标类型
  getSourceAndTargetType() {
    return this.serviceAssociationServ
      .getSourceType()
      .translate(CommonFuncService.formatObjForLangCode(this.stateServ.get('language')))
      .success((success) => {
        const data = success && success.data;
        const sourceTypeList = (data || []).map((item) => {
          return {
            label: item.entityName,
            value: item.entityId
          };
        });
        this.stateServ.set('sourceAndTargetTypeList', sourceTypeList);
        this.sourceTypeList = [ { label: 'service.common.all', value: '' } ].concat(
          CommonFuncService.clone(sourceTypeList)
        );
        this.targetTypeList = [ { label: 'service.common.all', value: '' } ].concat(
          CommonFuncService.clone(sourceTypeList)
        );
      })
      .error((error) => {});
  }

  // 获取关联类型列表
  getAssociationList() {
    const pageSearch = new PageSearch(this.pagingBoxObj.page, this.pagingBoxObj.rows);
    return this.serviceAssociationServ
      .getAssociationList(this.assicuationSearch, pageSearch)
      .translate(CommonFuncService.formatObjForLangCode(this.stateServ.get('language')))
      .success((success) => {
        const data = success && success.data;
        this.associationTypeList = (data && data.list) || [];
        this.pagingBoxObj.totalRecords = data && data.totalCount;
      })
      .error((error) => {
        this.associationTypeList = [];
        this.pagingBoxObj.totalRecords = 0;
      });
  }

  // 新增关联类型
  @clickOnce()
  handleAddAssociationTypeClick() {
    this.router.navigate([ '/content/service/association-type/list/add' ]);
  }

  // 切换分页
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;
    this.getAssociationList();
  }

  // 搜索
  @clickWaitHttp('handleSearchClick')
  handleSearchClick(assicuationSearch: AssicuationSearch) {
    console.log(assicuationSearch);
    this.assicuationSearch = assicuationSearch;
    this.pagingBoxObj.page = 1;
    if (this.oldAssicuationSearch && CommonFuncService.objectEq(this.oldAssicuationSearch, this.assicuationSearch)) {
      return;
    }
    return this.getAssociationList();
  }

  // 更新关联类型列表
  @clickWaitHttp('handleUpdateAssociationList')
  handleUpdateAssociationList() {
    return this.getAssociationList();
  }
}
