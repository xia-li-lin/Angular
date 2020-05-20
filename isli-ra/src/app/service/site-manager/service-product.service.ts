import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from 'src/app/core';
import { PageSearch, PaginationResult, ServiceProductSearch, ServiceProduct, WebFile } from '../model';

const HTTP_GET_SERVICE_PRODUCT_LIST = '/isli/irms/manage-website/base/serviceProviderProducts/v1/list';
const HTTP_GET_SERVICE_PRODUCT_HIDE_SHOW = '/isli/irms/manage-website/base/serviceProviderProducts/setIsShow';
const HTTP_GET_SERVICE_PRODUCT_SORT = '/isli/irms/manage-website/base/serviceProviderProducts/updateSort';
const HTTP_POST_SERVICE_PRODUCT_UPDATE =
  '/isli/irms/manage-website/base/serviceProviderProducts/updateServiceProviderProducts';
const HTTP_POST_SERVICE_PRODUCT_DELETE = '/isli/irms/manage-website/base/serviceProviderProducts/delete';
const HTTP_POST_SERVICE_PRODUCT_ADD =
  '/isli/irms/manage-website/base/serviceProviderProducts/addServiceProviderProducts';
const HTTP_GET_SERVICE_PRODUCT_DETAIL = '/isli/irms/manage-website/base/serviceProviderProducts/detail';

@Injectable({ providedIn: 'root' })
export class ServiceProductService {
  constructor(private http: HttpJson) {}

  getServiceProductList(
    search: ServiceProductSearch,
    page: PageSearch
  ): HttpResponse<PaginationResult<ServiceProduct>> {
    return this.http.get(HTTP_GET_SERVICE_PRODUCT_LIST, {}, Object.assign({}, search, page));
  }

  getServiceProductDetail(id: number): HttpResponse<{ serviceProduct: ServiceProduct; files: Array<WebFile> }> {
    return this.http.get(HTTP_GET_SERVICE_PRODUCT_DETAIL, {}, { id });
  }

  updateServiceProductHideShow(id: number, isShow: 0 | 1) {
    return this.http.get(HTTP_GET_SERVICE_PRODUCT_HIDE_SHOW, {}, { id, isShow });
  }

  updateServiceProductSort(id: number, sort: number) {
    return this.http.get(HTTP_GET_SERVICE_PRODUCT_SORT, {}, { id, sort });
  }

  updateServiceProduct(serviceProduct: ServiceProduct) {
    return this.http.post(HTTP_POST_SERVICE_PRODUCT_UPDATE, {}, {}, serviceProduct);
  }

  deleteServiceProduct(id: number) {
    return this.http.post(HTTP_POST_SERVICE_PRODUCT_DELETE, {}, { id }, {});
  }

  addServiceProduct(serviceProduct: ServiceProduct) {
    return this.http.post(HTTP_POST_SERVICE_PRODUCT_ADD, {}, {}, serviceProduct);
  }
}
