import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LanguageService, STEP, NavigationService, PictureService, ContentService } from 'src/app/service';
import { CommonFuncService, clickOnce, clickWaitHttp, AppState } from 'src/app/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: [ './language.component.scss' ]
})
export class LanguageComponent implements OnInit {
  public languageListStandradData: Array<any>;
  public languageListData: Array<any>;
  public homeBackgroundData: Array<any>;
  public contentData: Array<any>;
  public step = STEP.FIRST;
  public STEP = STEP;
  public langCode: string;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private languageService: LanguageService,
    private navigationService: NavigationService,
    private pictureService: PictureService,
    private contentService: ContentService,
    private stateServ: AppState
  ) {
    activateRoute.queryParams.subscribe((params) => {
      console.log('params', params);
      this.langCode = params.confLangCode;
    });
  }

  ngOnInit() {
    this.getDefaultNavTree();
    this.getNavTree();
    this.getHomeBackground();
    this.getContentData();
  }

  getDefaultNavTree() {
    this.navigationService.getTree().success((res) => {
      console.log('languageListStandradData', res.data);
      const trans = res.data.filter((item) => {
        return item.pId;
      });
      this.languageListStandradData = this.toTree(trans);
    });
  }

  getNavTree() {
    this.navigationService.getTree(this.langCode).success((res) => {
      console.log('languageListData', res.data);
      const trans = res.data.filter((item) => {
        return item.pId;
      });
      this.languageListData = this.toTree(trans);
    });
  }

  getHomeBackground() {
    this.pictureService.getImageForLangCode(this.langCode).success((res) => {
      console.log('homeBackgroundData', res.data);
      this.homeBackgroundData = res.data;
    });
  }

  getContentData() {
    this.contentService.getContentLangList(this.langCode).success((res) => {
      console.log(res);
      this.contentData = res.data.list;
    });
  }

  @clickOnce()
  handleStepClick(step: STEP) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.step = step;
  }

  @clickWaitHttp('handleCompleteClick')
  handleCompleteClick() {
    this.languageService.enableLanguage(this.langCode).success((res) => {
      this.languageService.getLanguages().success((res2) => {
        this.stateServ.set('languageType', res2.data || []);
      });
      this.router.navigate([ '/content/system/language-list' ]);
    });
  }

  handleCancelClick() {
    this.router.navigate([ '/content/system/language-list' ]);
  }

  toTree(data) {
    // 删除 所有 children,以防止多次调用
    data.forEach((item) => {
      delete item.children;
    });
    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    const map = {};
    data.forEach((item) => {
      map[item.id] = item;
    });
    console.log('data---', data);
    console.log('data---', map[1]);
    const val = [];
    data.forEach((item) => {
      // // 以当前遍历项，的pid,去map对象中找到索引的id
      const parent = map[item.pId];
      // // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent && item !== parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(item);
      }
    });

    val.map((item) => {
      if (item.pId === '0') {
        const firstLevel = CommonFuncService.clone(item);
        if (firstLevel.children) {
          delete firstLevel.children;
        }
        (item.children || (item.children = [])).unshift(firstLevel);
      }
    });
    return val;
  }
}
