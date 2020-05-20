import { ParamCodeQueryParams } from './../../service/model/source-list.model';
import { Directive, forwardRef, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, AsyncValidator } from '@angular/forms';
import { HttpResponse } from 'src/app/core';
import { ServiceAssociationService, ServiceListService, SourceListService } from 'src/app/service';
import { EntityType, SOURCE_TYPE, EntityField } from 'src/app/service/model';

@Directive({
  selector: '[appValidNameUnique]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => ValidNameUniqueDirective),
      multi: true
    }
  ]
})
export class ValidNameUniqueDirective implements AsyncValidator {
  /**
   * mark
   * 繁体中文带Zh, 英文带En
   * serviceNameZh:服务列表表单新增，修改 校验服务的唯一性
   * serviceNameEn:服务列表表单新增，修改 校验服务的唯一性
   * associationTypeNameZh:关联类型表单新增，修改 校验关联类型名称唯一性
   * associationTypeNameEn:关联类型表单新增，修改 校验关联类型名称唯一性
   * entityName 源列表表单 新增 校验源名称唯一性
   * targetName 目标列表表单 新增 检验
   * paramCode 校验编目的唯一性
   */
  @Input() entityType?: EntityType;
  @Input() mark: string;
  @Input() oldName?: string;
  @Input() entityField?: EntityField;

  constructor(
    private serviceAssociationServ: ServiceAssociationService,
    private serviceListServ: ServiceListService,
    private sourceListServ: SourceListService
  ) {}

  public validate(control: AbstractControl) {
    const name = control.value;
    console.log(name);

    let req: HttpResponse<any>;
    if (!name || this.oldName === name) {
      return Promise.resolve(null);
    }

    if (this.mark === 'serviceNameZh') {
      req = this.serviceListServ.checkServiceNameZhExist(name);
    } else if (this.mark === 'serviceNameEn') {
      req = this.serviceListServ.checkServiceNameEnExist(name);
    } else if (this.mark === 'associationTypeNameZh') {
      req = this.serviceAssociationServ.checkAssocitionNameZhExist(name);
    } else if (this.mark === 'associationTypeNameEn') {
      req = this.serviceAssociationServ.checkAssocitionNameEnExist(name);
    } else if (this.mark === 'entityName') {
      this.entityType.entityType = SOURCE_TYPE.ENTITY;
      req = this.sourceListServ.checkSourceEntityExist(this.entityType);
    } else if (this.mark === 'targetName') {
      this.entityType.entityType = SOURCE_TYPE.TARGET;
      req = this.sourceListServ.checkSourceEntityExist(this.entityType);
    } else if (this.mark === 'paramCode') {
      const paramCodeQueryParams = new ParamCodeQueryParams(
        this.entityField.entityId,
        this.entityField.paramCode || name,
        this.entityField.paramId || 0
      );
      console.log(this.entityField);
      req = this.sourceListServ.checkParamCodeExist(paramCodeQueryParams);
    }
    console.log(req, this.mark);

    return req
      .success((success) => {
        return null;
      })
      .error((error) => {
        return { unique: true };
      })
      .toPromise();
  }
}
