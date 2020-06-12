import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalValidService } from 'mpr-form-valid';
import {
  ATTR_TYPE,
  AttrTypeList,
  DropDownOption,
  EntityField,
  ParamTypeList,
  PermissionList
} from 'src/app/service/model';
import { AppState, CommonFuncService } from 'src/app/core';
import calculateNodeHeight from 'src/app/shared/directive/calculateNodeHeight';

const ERROR_MSG = {
  displayOrder: {
    required: 'service.targetList.config.form.valid.sort'
  },
  paramNameZh: {
    required: 'service.targetList.config.form.valid.chineseName'
  },
  paramNameEn: {
    required: 'service.targetList.config.form.valid.englishName'
  },
  permission: {
    required: 'service.targetList.config.form.valid.dataOpenPermission'
  },
  paramCode: {
    required: 'service.targetList.config.form.valid.propFieldName',
    unique: 'service.targetList.config.form.valid.propFieldNameUnique'
  },
  dataId: {
    required: 'service.targetList.config.form.valid.propType'
  },
  paramType: {
    required: 'service.targetList.config.form.valid.catalogType'
  },
  multiValue: {
    required: 'service.targetList.config.form.valid.multiValue'
  },
  controlledId: {
    required: 'service.targetList.config.form.valid.controlledTerms'
  }
};

@Component({
  selector: 'app-target-attr-form',
  templateUrl: './target-attr-form.component.html',
  styleUrls: [ './target-attr-form.component.scss' ]
})
export class TargetAttrFormComponent implements OnInit, OnChanges, AfterViewInit {
  @Output() cancel = new EventEmitter();
  @Output() OnSaveClick = new EventEmitter();

  @Input() controllWordList: Array<DropDownOption>;
  @Input() entityField: EntityField;

  @ViewChild('dialog', null)
  dialog: ElementRef;
  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  public attrType = ATTR_TYPE;
  public attrTypeList = AttrTypeList;
  public errorMsg = ERROR_MSG;
  public language: string;
  public oldEntityField: EntityField;
  public paramTypeList = ParamTypeList;
  public permissionList = PermissionList;
  public title: string;

  constructor(private globalValidServ: GlobalValidService, private stateServ: AppState) {
    this.language = this.stateServ.get('language');
  }

  ngOnChanges(changes: SimpleChanges) {
    const entityField = changes && changes.entityField && changes.entityField.currentValue;
    this.oldEntityField = CommonFuncService.clone(entityField);
    if (entityField && entityField.paramId) {
      this.title = 'service.targetList.config.form.modify';
    } else {
      this.title = 'service.targetList.config.form.add';
    }
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    const dialogHeight = calculateNodeHeight(this.dialog.nativeElement);

    if (dialogHeight % 2 !== 0) {
      this.dialog.nativeElement.style.height = dialogHeight + 1 + 'px';
    }
  }

  // 保存
  handleSaveClick() {
    console.log(this.entityField);
    if (this.globalValidServ.validAll()) {
      this.OnSaveClick.emit(this.entityField);
    }
  }
}
