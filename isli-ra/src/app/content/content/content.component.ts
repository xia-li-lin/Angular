import { Component, OnInit } from '@angular/core';
import { Routes, Router, NavigationEnd, Route, ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/core';
import { TranslateService } from '@ngx-translate/core';
import { generate } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { FqManagerService, FeedBackService } from 'src/app/service';

const LEFT_NAVS = {
  user: {
    title: 'content.nav.account.manager',
    navs: [
      {
        routerLink: [ '/content/user/unification' ],
        navName: 'content.nav.account.lcManager'
      },
      {
        routerLink: [ '/content/user/sp-manager' ],
        navName: 'content.nav.account.spManager'
      }
    ]
  },
  service: {
    title: 'service.nav.serverManager',
    navs: [
      {
        routerLink: [ '/content/service/register' ],
        navName: 'service.nav.serviceRegisterManager'
      },
      {
        routerLink: [ '/content/service/sp-apply-add-service' ],
        navName: 'service.nav.spApplyNewService'
      },
      {
        routerLink: [ '/content/service/services' ],
        navName: 'service.nav.serviceList'
      },
      {
        routerLink: [ '/content/service/association-type' ],
        navName: 'service.nav.associationType'
      },
      {
        routerLink: [ '/content/service/source-list' ],
        navName: 'service.nav.sourceList'
      },
      {
        routerLink: [ '/content/service/target-list' ],
        navName: 'service.nav.targetList'
      },
      {
        routerLink: [ '/content/service/controlled-word-manager' ],
        navName: 'service.nav.controlledWordManagement'
      }
    ]
  },
  area: {
    title: 'content.nav.area.manager',
    navs: [
      {
        routerLink: [ '/content/area' ],
        navName: 'content.nav.area.manager'
      }
    ]
  },
  lc: {
    title: 'content.nav.lc.manager',
    navs: [
      {
        routerLink: [ '/content/lc/alloct' ],
        navName: 'content.nav.lc.allocated'
      },
      {
        routerLink: [ '/content/lc/threshold' ],
        navName: 'content.nav.lc.thresthold'
      }
    ]
  },
  statistic: {
    title: 'statistic.nav.dataAnsys',
    navs: [
      {
        routerLink: [ '/content/statistic/islicode' ],
        navName: 'statistic.nav.islicodeAnsys'
      },
      {
        routerLink: [ '/content/statistic/servicecode' ],
        navName: 'statistic.nav.serviceCodeAnsys'
      },
      {
        routerLink: [ '/content/statistic/sp' ],
        navName: 'statistic.nav.spAnsys'
      },
      {
        routerLink: [ '/content/statistic/lc' ],
        navName: 'statistic.nav.lcAnsys'
      },
      {
        routerLink: [ '/content/statistic/search' ],
        navName: 'statistic.nav.searchAnsys'
      },
      {
        routerLink: [ '/content/statistic/analysis' ],
        navName: 'statistic.nav.analysis'
      }
    ]
  },
  system: {
    title: 'content.nav.systemtManager',
    navs: [
      {
        routerLink: [ '/content/system/account-list' ],
        navName: 'systemAccount.nav.systemAccount'
      },
      {
        routerLink: [ '/content/system/role-list' ],
        navName: 'systemRole.list.manager'
      },
      {
        routerLink: [ '/content/system/message-list' ],
        navName: 'systemMessage.list.mess'
      },
      // {
      //   routerLink: [ '/content/system/language-list' ],
      //   navName: '語種配寘'
      // },
      {
        routerLink: [ '/content/system/email-list' ],
        navName: 'systemEmail.list.emialTemp'
      },
      {
        routerLink: [ '/content/system/log' ],
        navName: 'content.nav.logger'
      }
    ]
  },
  site: [
    {
      title: 'siteManager.leftNav.WebsiteManagement',
      navs: [
        {
          navName: 'siteManager.leftNav.news',
          routerLink: [ '/content/site/content/news' ]
        },
        {
          navName: 'siteManager.leftNav.consulting',
          routerLink: [ '/content/site/content/consulting' ]
        },
        {
          navName: 'siteManager.leftNav.content',
          routerLink: [ '/content/site/content/content' ]
        },
        {
          navName: 'siteManager.leftNav.picture',
          routerLink: [ '/content/site/content/picture' ]
        },
        {
          navName: 'siteManager.leftNav.questions',
          routerLink: [ '/content/site/content/questions' ]
        },
        {
          navName: 'siteManager.leftNav.appExamples',
          routerLink: [ '/content/site/content/app-examples' ]
        },
        {
          navName: 'siteManager.leftNav.associates',
          routerLink: [ '/content/site/content/associates' ]
        },
        {
          navName: 'siteManager.leftNav.products',
          routerLink: [ '/content/site/content/products' ]
        }
      ]
    },
    {
      title: 'siteManager.leftNav.InteractiveManagement',
      navs: [
        {
          navName: 'siteManager.leftNav.feedbacks',
          routerLink: [ '/content/site/interact/feedbacks' ]
        },
        {
          navName: 'siteManager.leftNav.fqmanagers',
          routerLink: [ '/content/site/interact/fqmanagers' ]
        }
      ]
    },
    {
      title: 'siteManager.leftNav.WebsiteSettings',
      navs: [
        {
          navName: 'siteManager.leftNav.navs',
          routerLink: [ '/content/site/setting/navs' ]
        },
        {
          navName: 'siteManager.leftNav.info',
          routerLink: [ '/content/site/setting/info' ]
        }
      ]
    }
  ]
};
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: [ './content.component.scss' ]
})
export class ContentComponent implements OnInit {
  public fqManagerNumber: string;
  public feedBackNumber: string;
  public navItems = [];
  public language: string;
  public lastNavParams: any = {};
  public leftNav: any = null;
  // public gameName: string;
  constructor(
    private fqManagerService: FqManagerService,
    private feedBackService: FeedBackService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private stateServ: AppState,
    private translateServ: TranslateService
  ) {
    this.language = this.stateServ.get('language') === 'EN_US' ? '-en' : '-zh';
    this.lastNavParams = stateServ.get('routerCache') || {};
    // activeRouter.queryParams.subscribe((info) => {
    //   console.log(info);
    //   if (info.name || info.gameName) {
    //     this.gameName = info.name || info.gameName;
    //   }
    // });
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // console.log(router.config);
        const url = event.urlAfterRedirects || event.url;
        const queryParams = activeRouter.snapshot.queryParams;
        if (queryParams && Object.keys(queryParams).length) {
          this.lastNavParams[url.split('?')[0]] = queryParams;
        }
        stateServ.set('routerCache', this.lastNavParams);
        const urlTree = (event.urlAfterRedirects || event.url).split('?')[0].split('/');
        urlTree.shift(); // first is empty string
        const index = urlTree.findIndex((elem) => elem === 'content');
        this.leftNav = LEFT_NAVS[urlTree[index + 1]] || null;
        this.navItems = [];
        const destRouts = [];
        router.config.forEach((elem) => {
          destRouts.push(this.formatRouter(elem));
        });
        this.buildNavItems(urlTree, destRouts);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });

        if (url.indexOf('/content/site') !== -1) {
          this.getManagerNewCount();
        }

        if (url.indexOf('/content/site') !== -1) {
          this.getFeedBackUndealCount();
        }
      }
    });
  }

  // get leftNav() {
  //   const urls = this.activeRouter.snapshot.url;
  //   const index = urls.findIndex(elem => elem.path === 'content') + 1;
  //   if (index <= 1) {
  //     return { title: '', navs: [] };
  //   }
  //   return LEFT_NAVS[urls[index].path];
  // }

  private formatRouter(route: any, parent?: Array<any>) {
    // const destRouter: any = Object.assign({}, route);
    const destRouter: any = { path: route.path, data: Object.assign({}, route.data), children: [], parent: null };
    if (route.children) {
      // destRouter.children = [];
      route.children.forEach((elem) => {
        const formatRoutes = this.formatRouter(elem, destRouter.children);
        formatRoutes.parent = destRouter;
        destRouter.children.push(formatRoutes);
      });
    }
    if (route._loadedConfig) {
      // destRouter.destRouter = { routes: [] };
      route._loadedConfig.routes.forEach((elem) => {
        const formatRoutes = this.formatRouter(elem, destRouter.children);
        // destRouter.destRouter.routes.push(formatRoutes);
        formatRoutes.parent = destRouter;
        destRouter.children.push(formatRoutes);
      });
    }
    const paths = destRouter.path.split('/');
    if (paths.length <= 1) {
      return destRouter;
    } else {
      let restRoutes = destRouter;
      const findex = parent.findIndex((elem) => elem.path === paths[0]);
      if (findex !== -1) {
        destRouter.data = destRouter.data || {};
        Object.assign(destRouter.data, { label: parent[findex].data && parent[findex].data.label });
      }
      restRoutes.path = paths[0];
      paths.forEach((path: string, index: number) => {
        if (index < 1) {
          return;
        }
        restRoutes.children.push({
          path,
          data: Object.assign({}, destRouter.data, { label: '' }),
          children: [],
          parent: destRouter
        });
        restRoutes = restRoutes.children[restRoutes.children.length - 1];
      });
      restRoutes.data.label = route.data && route.data.label;
    }
    return destRouter;
  }

  ngOnInit() {
    // console.log(this.injector.get(ROUTES));
    this.getManagerNewCount();
    this.getFeedBackUndealCount();
  }

  // 统计自主问答管理数量
  private getManagerNewCount() {
    this.fqManagerService
      .getManagerNewCount()
      .success((res) => {
        this.fqManagerNumber = res.data > 100 ? '99+' : '' + (res.data || '');
      })
      .error((res) => {
        console.log(res);
      });
  }

  // 统计客户反馈管理数量
  private getFeedBackUndealCount() {
    this.feedBackService
      .getFeedBackUndealCount()
      .success((res) => {
        this.feedBackNumber = res.data > 100 ? '99+' : '' + (res.data || '');
      })
      .error((res) => {
        console.log(res);
      });
  }

  private findNavItem(urlTree: Array<string>, routers: Array<any>, index: number) {
    const path = urlTree[index];
    let result: any;
    if (index + 1 === urlTree.length) {
      const fIndex = routers.findIndex((elem) => {
        return elem.path === path || elem.path.startsWith(':') || elem.path.startsWith('*');
      });
      if (fIndex !== -1) {
        result = routers[fIndex];
      }
    } else {
      routers.forEach((elem) => {
        if (elem.path === path || elem.path.startsWith(':') || elem.path.startsWith('*')) {
          result = this.findNavItem(urlTree, elem.children, index + 1) || result;
        }
      });
      if (!result && routers.length) {
        console.error('not find match url', urlTree, routers, urlTree[index]);
      }
    }
    return result;
  }

  private buildNavItems(urlTree: Array<string>, routes: Routes) {
    const navFItem = this.findNavItem(urlTree, routes, 0);
    const parentUrls = [];
    this.navItems = [];
    if (navFItem) {
      generate(navFItem, (item) => item, (item) => item.parent).pipe(toArray()).subscribe((navItems: Array<any>) => {
        console.log('1111111', navItems);
        navItems.reverse().forEach((navItem) => {
          parentUrls.push(navItem.path);
          if (navItem.data && navItem.data.label) {
            const url = parentUrls.join('/');
            this.navItems.push({
              label: this.formartLabel(navItem.data.label, url, navItem.data.default),
              routerLink: url,
              command: (itemInfo) => {
                this.router.navigate([ itemInfo.item.routerLink ], {
                  queryParams: this.lastNavParams[itemInfo.item.routerLink]
                });
              }
            });
          }

          // const index = this.navItems.length - 1;
          // this.translateServ.get(elem.data.label).subscribe(label => {
          //   this.navItems[index] = Object.assign({}, this.navItems[index], { label: label });
          // });
        });
      });
    }
  }

  private buildNavItemsBack(urlTree: Array<string>, routes: Routes, parentUrls: Array<string>) {
    if (!urlTree.length || !routes || !routes.length) {
      return;
    }
    const root = urlTree.pop();
    let restRoutes;
    routes.some((elem: any) => {
      if (elem.path === root || elem.path.startsWith(':') || elem.path.startsWith('*')) {
        parentUrls.push(root);
        if (elem.children) {
          restRoutes = elem.children;
        } else if (elem._loadedConfig) {
          restRoutes = elem._loadedConfig.routes;
        }
        if (elem.data && elem.data.label) {
          const url = parentUrls.join('/');
          this.navItems.push({
            label: this.formartLabel(elem.data.label, url, elem.data.default),
            routerLink: url,
            command: (itemInfo) => {
              this.router.navigate([ itemInfo.item.routerLink ], {
                queryParams: this.lastNavParams[itemInfo.item.routerLink]
              });
            }
          });
          const index = this.navItems.length - 1;
          this.translateServ.get(elem.data.label).subscribe((label) => {
            this.navItems[index] = Object.assign({}, this.navItems[index], { label });
          });
        } else if (elem.path.startsWith(':') && this.navItems.length) {
          const url = parentUrls.join('/');
          this.navItems[this.navItems.length - 1].routerLink = url;
        }
        return true;
      }
    });
    if (!restRoutes && urlTree.length) {
      console.error('there is no route match', urlTree, routes, parentUrls);
    }
    if (!urlTree.length && restRoutes && restRoutes.length) {
      urlTree = [ '' ];
    }
    this.buildNavItemsBack(urlTree, restRoutes, parentUrls);
  }

  private formartLabel(srcLabel: string, url: string, defaultTxt = '') {
    const queryParams = this.lastNavParams[url];
    let label = srcLabel;
    if (queryParams) {
      label = srcLabel.replace(/\{(\w+)\}/g, (math, key) => {
        if (key in queryParams) {
          return queryParams[key];
        }
        return defaultTxt || key;
      });
    }
    this.translateServ.get(label).subscribe((text) => {
      label = text;
    });
    return label;
  }
}
