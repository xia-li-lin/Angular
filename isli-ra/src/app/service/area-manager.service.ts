import { Injectable } from '@angular/core';
import { HttpJson, CommonFuncService, AppState } from '../core';
import { Block, BlockSearch, BlockServiceSearch, Industry, BlockService } from './model/area-manager.model';
import { PageSearch } from './model';

const HTTP_ADD_AREA_BLOCK = '/isli/irms/manage-block/base/block/add';
const HTTP_UPDATE_AREA_BLOCK = '/isli/irms/manage-block/base/block/update';
const HTTP_GET_AREA_BLOCK_LIST = '/isli/irms/manage-block/base/block/selPageList';
const HTTP_GET_AREA_BLOCK_DETAIL = '/isli/irms/manage-block/base/block/details';
const HTTP_GET_BLOCK_SERVICE_LIST = '/isli/irms/manage-block/base/blockServiceCode/selServicePageList';
const HTTP_GET_BLOCK_SERVICE_UNADD_LIST = '/isli/irms/manage-block/base/blockServiceCode/selNotRegisterPageList';
const HTTP_POST_BLOCK_SERVICE_ENABLE = '/isli/irms/manage-block/base/blockServiceCode/enable';
const HTTP_POST_BLOCK_SERIVCE_DISABLE = '/isli/irms/manage-block/base/blockServiceCode/disable';
const HTTP_GET_AREA_BLOCK_NAME_EXISTS = '/isli/irms/manage-block/base/block/isExistsBlock';
const HTTP_POST_BLOCK_SERVICE_ADD = '/isli/irms/manage-block/base/blockServiceCode/addServiceCode';

@Injectable()
export class AreaManagerService {
  constructor(private http: HttpJson, private stateServ: AppState) {}

  public addAreaBlock(block: Block) {
    // const blockNew: Block = CommonFuncService.clone(block);
    // if (blockNew.blockIndustryInfos.length && !(block.blockIndustryInfos[0] instanceof Industry)) {
    //   blockNew.blockIndustryInfos = block.blockIndustryInfos.map((elem: any) => {
    //     return new Industry(elem);
    //   });
    // }
    return this.http.post(HTTP_ADD_AREA_BLOCK, {}, {}, block);
  }

  public updateAreaBlock(block: Block) {
    // const blockNew: Block = CommonFuncService.clone(block);
    // if (blockNew.blockIndustryInfos.length && !(block.blockIndustryInfos[0] instanceof Industry)) {
    //   blockNew.blockIndustryInfos = block.blockIndustryInfos.map((elem: any) => {
    //     return new Industry(elem);
    //   });
    // }
    return this.http.post(HTTP_UPDATE_AREA_BLOCK, {}, {}, block);
  }

  public checkAreaBlockName(blockName: string) {
    return this.http.get(HTTP_GET_AREA_BLOCK_NAME_EXISTS, {}, { blockName });
  }

  public getAreaBlockList(searchInfo: BlockSearch, pageInfo: PageSearch) {
    return this.http.get(HTTP_GET_AREA_BLOCK_LIST, {}, Object.assign({}, searchInfo, pageInfo));
  }

  public getBlockDetail(blockId: string) {
    return this.http.get(HTTP_GET_AREA_BLOCK_DETAIL, {}, { blockId });
  }

  public getBlockServiceList(search: BlockServiceSearch, page: PageSearch) {
    return this.http.get(HTTP_GET_BLOCK_SERVICE_LIST, {}, Object.assign({}, search, page)).translate((data) => {
      const language: string = this.stateServ.get('language') || 'ZH_TW';
      if (language.toLowerCase().indexOf('zh') !== -1) {
        (data.list || []).forEach((elem) => {
          Object.keys(elem).forEach((keyName) => {
            if (keyName.endsWith('Zh')) {
              const propertyName = keyName.substring(0, keyName.length - 2);
              elem[propertyName] = elem[keyName] || elem[propertyName + 'En'];
            }
          });
        });
      } else {
        (data.list || []).forEach((elem) => {
          Object.keys(elem).forEach((keyName) => {
            if (keyName.endsWith('En')) {
              const propertyName = keyName.substring(0, keyName.length - 2);
              elem[propertyName] = elem[keyName] || elem[propertyName + 'Zh'];
            }
          });
        });
      }
      return data;
    });
  }

  public getBlockServiceUnAddList(search: BlockServiceSearch, page: PageSearch) {
    return this.http.get(HTTP_GET_BLOCK_SERVICE_UNADD_LIST, {}, Object.assign({}, search, page)).translate((data) => {
      const language: string = this.stateServ.get('language') || 'ZH_TW';
      if (language.toLowerCase().indexOf('zh') !== -1) {
        (data.list || []).forEach((elem) => {
          Object.keys(elem).forEach((keyName) => {
            if (keyName.endsWith('Zh')) {
              const propertyName = keyName.substring(0, keyName.length - 2);
              elem[propertyName] = elem[keyName] || elem[propertyName + 'En'];
            }
          });
        });
      } else {
        (data.list || []).forEach((elem) => {
          Object.keys(elem).forEach((keyName) => {
            if (keyName.endsWith('En')) {
              const propertyName = keyName.substring(0, keyName.length - 2);
              elem[propertyName] = elem[keyName] || elem[propertyName + 'Zh'];
            }
          });
        });
      }
      return data;
    });
  }

  public enableBlockService(blockId: string) {
    return this.http.post(HTTP_POST_BLOCK_SERVICE_ENABLE, {}, { tid: blockId }, {});
  }

  public disableBlockService(blockId: string) {
    return this.http.post(HTTP_POST_BLOCK_SERIVCE_DISABLE, {}, { tid: blockId }, {});
  }

  public addBlockService(blockService: BlockService) {
    return this.http.post(HTTP_POST_BLOCK_SERVICE_ADD, {}, {}, blockService);
  }
}
