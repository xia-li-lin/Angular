import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle, ActivatedRoute } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private handlers: { [key: string]: DetachedRouteHandle } = {};

  // 直接返回 true 表示对所有路由允许复用
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    console.log(`shouldDetach key:${this.getStoreKey(route)}`);
    return route.data.reload === false;
  }
  // 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象；path等同RouterModule.forRoot中的配置。
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const key = this.getStoreKey(route);
    this.handlers[key] = handle;
  }
  // 若 path 在缓存中有的都认为允许还原路由
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const key = this.getStoreKey(route);
    if (route.queryParams.reload) {
      this.handlers[key] = null;
      return false;
    }
    console.log(`shouldAttach key:${key}`);
    return route.data.reload === false && !!this.handlers[key];
  }
  // 从缓存中获取快照，若无则返回null
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return this.handlers[this.getStoreKey(route)];
  }
  // 进入路由触发，判断是否同一路由 返回值为true的情况下，直接使用当前路由快照，否则就创建和查找新的路由快照
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    if (future.queryParams.forceReload) {
      this.handlers = {};
      return false;
    }
    if ((!future.children || !future.children.length) && future.queryParams.reload) {
      // 查询参数中指定了reload 则强制刷新
      this.handlers[this.getStoreKey(future)] = null;
      return false;
    }
    if (future.data.reload === true) {
      this.handlers[this.getStoreKey(future)] = null;
      return false;
    }
    console.log(`shouldReuseRoute future key:${this.getStoreKey(future)}  curr key: ${this.getStoreKey(curr)}`);
    if (future.routeConfig !== curr.routeConfig) {
      const futureKey = this.getKeyWithOutQueryParam(future);
      const currKey = this.getKeyWithOutQueryParam(curr);
      if (!futureKey.startsWith(currKey)) {
        // 列表页面进入详情页面
        this.handlers[this.getStoreKey(curr)] = null;
      }
      return false;
    }
    return true;
  }

  private getStoreKey(route: ActivatedRouteSnapshot) {
    let key = this.getKeyWithOutQueryParam(route);
    if (!route.children || !route.children.length) {
      key += Object.keys(route.queryParams).reduce((result, elem) => {
        if (elem === 'reload' || elem === 'forceReload') {
          return result;
        }
        return (result += `${elem}=${route.queryParams[elem]}`);
      }, '');
    }
    // console.log('route key is: ', key);
    return key;
  }

  private getKeyWithOutQueryParam(route: ActivatedRouteSnapshot) {
    let key = '';
    if (!route.parent && !route.url.length) {
      return 'root';
    }
    if (route.parent && !route.parent.component) {
      key = route.parent.url.reduce((result, elem) => {
        return (
          result +
          elem.path.replace(/:([a-zA-Z\-_]+)/g, (match, p1) => {
            if (p1 in elem.parameters) {
              return '/' + encodeURIComponent(elem.parameters[p1]) || '';
            }
            return p1;
          })
        );
      }, '');
    }
    key += route.url.reduce((result, elem) => {
      return (
        result +
        elem.path.replace(/:([a-zA-Z\-_]+)/g, (match, p1) => {
          if (p1 in elem.parameters) {
            return '/' + encodeURIComponent(elem.parameters[p1]) || '';
          }
          return p1;
        })
      );
    }, '');
    return key;
  }
}
