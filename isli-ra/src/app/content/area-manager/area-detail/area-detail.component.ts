import { GlobalValidService } from 'mpr-form-valid';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { Block } from 'src/app/service/model/area-manager.model';
import { AreaManagerService } from 'src/app/service/area-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonFuncService, clickOnce, clickWaitHttp, HttpResponse } from 'src/app/core';

const ErrMsg = {
  blcokName: {
    required: 'areaManager.detail.valid.blcokName.required',
    existError: 'areaManager.detail.valid.blcokName.existError'
  },
  region: {
    required: 'areaManager.detail.valid.region.required'
  },
  blockIndustryInfos: {
    required: 'areaManager.detail.valid.blockIndustryInfos.required'
  },
  logoUrl: {
    required: 'areaManager.detail.valid.logoUrl.required',
    imageContentError: 'areaManager.detail.valid.logoUrl.imageContentError',
    imageFileTypeError: 'areaManager.detail.valid.logoUrl.imageFileTypeError',
    imageFileSizeError: 'areaManager.detail.valid.logoUrl.imageFileSizeError',
    imageWidthHeightError: 'areaManager.detail.valid.logoUrl.imageWidthHeightError'
  },
  ueditor: {
    bockDesc: {
      required: 'areaManager.detail.valid.ueditor.bockDesc.required'
    },
    productDesc: {
      required: 'areaManager.detail.valid.ueditor.productDesc.required'
    },
    applicationCase: {
      required: 'areaManager.detail.valid.ueditor.applicationCase.required'
    }
  },
  siteUrl: {
    pattern: 'areaManager.detail.valid.siteUrl.pattern'
  }
};

@Component({
  selector: 'app-area-detail',
  templateUrl: './area-detail.component.html',
  styleUrls: [ './area-detail.component.scss' ]
})
export class AreaDetailComponent implements OnInit {
  public areaBlock = new Block();
  public config = {
    initialFrameWidth: 700,
    initialFrameHeight: 320
  };
  public errMsg = ErrMsg;
  public httpOptions = [ { label: 'http', value: 'http' }, { label: 'https', value: 'https' } ];
  public httpProc = 'http';
  public industrys = [];
  public languages = [];
  public oldBlock: Block;
  public readonly = false;
  public regions = [];
  public selectedIndustrys = [];

  constructor(
    private areaManagerServ: AreaManagerService,
    private activeRoute: ActivatedRoute,
    private commonServ: CommonService,
    private globalValidServ: GlobalValidService,
    private router: Router
  ) {}

  ngOnInit() {
    this.commonServ.getCompanyIndustry().success((res) => {
      this.industrys = (res.data.data || []).map((elem) => {
        return { label: elem.v, value: elem.k };
      });
    });
    this.commonServ.getUserRegions().success((res) => {
      this.regions = (res.data.data || []).map((elem) => {
        return { label: elem.v, value: elem.k };
      });
    });
    this.activeRoute.queryParams.subscribe((params: any) => {
      if (params.blockId) {
        this.areaManagerServ.getBlockDetail(params.blockId).success((res) => {
          this.areaBlock = res.data;
          this.oldBlock = CommonFuncService.clone(res.data);
          if (this.areaBlock.siteUrl) {
            const siteUrls = this.areaBlock.siteUrl.split('://');
            this.httpProc = siteUrls[0];
            this.areaBlock.siteUrl = siteUrls[1];
          }
          this.selectedIndustrys = (this.areaBlock.blockIndustryInfos || []).map((elem) => elem.industryCode);
        });
      }
      this.readonly = !!params.readonly;
    });
  }

  @clickOnce()
  handleCancelClick() {
    this.router.navigate([ 'list' ], { relativeTo: this.activeRoute.parent });
  }

  @clickWaitHttp('handleSubmitClick')
  handleSubmitClick() {
    if (!this.globalValidServ.validAll(true)) {
      return;
    }
    const areBlock = CommonFuncService.clone(this.areaBlock);
    areBlock.siteUrl = this.httpProc + '://' + areBlock.siteUrl;
    const selectIndustrys = this.selectedIndustrys.map((industryCode) => {
      const fElem = this.industrys.find((elem) => elem.value === industryCode);
      return { industryCode: fElem.value, blockIndustryName: fElem.label };
    });
    areBlock.blockIndustryInfos = selectIndustrys;
    let req: HttpResponse<any>;
    if (!this.areaBlock.blockId) {
      req = this.areaManagerServ.addAreaBlock(areBlock);
    } else {
      req = this.areaManagerServ.updateAreaBlock(areBlock);
    }
    return req.success(() => {
      this.router.navigate([ 'list' ], { relativeTo: this.activeRoute.parent, queryParams: { reload: true } });
    });
  }
}
