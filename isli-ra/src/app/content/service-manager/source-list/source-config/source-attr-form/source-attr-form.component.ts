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
import { AppState, CommonFuncService } from 'src/app/core';
import {
  ATTR_TYPE,
  AttrTypeList,
  DropDownOption,
  EntityField,
  ParamTypeList,
  PermissionList
} from 'src/app/service/model';
import calculateNodeHeight from 'src/app/shared/directive/calculateNodeHeight';

const ERROR_MSG = {
  displayOrder: {
    required: 'service.sourceList.config.form.valid.sort'
  },
  paramNameZh: {
    required: 'service.sourceList.config.form.valid.chineseName'
  },
  paramNameEn: {
    required: 'service.sourceList.config.form.valid.englishName'
  },
  permission: {
    required: 'service.sourceList.config.form.valid.dataOpenPermission'
  },
  paramCode: {
    required: 'service.sourceList.config.form.valid.propFieldName',
    unique: 'service.sourceList.config.form.valid.propFieldNameUnique'
  },
  dataId: {
    required: 'service.sourceList.config.form.valid.propType'
  },
  paramType: {
    required: 'service.sourceList.config.form.valid.catalogType'
  },
  multiValue: {
    required: 'service.sourceList.config.form.valid.multiValue'
  },
  controlledId: {
    required: 'service.sourceList.config.form.valid.controlledTerms'
  }
};

@Component({
  selector: 'app-source-attr-form',
  templateUrl: './source-attr-form.component.html',
  styleUrls: [ './source-attr-form.component.scss' ]
})
export class SourceAttrFormComponent implements OnInit, OnChanges, AfterViewInit {
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

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
      this.title = 'service.sourceList.config.form.modify';
    } else {
      this.title = 'service.sourceList.config.form.add';
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
      this.save.emit(this.entityField);
    }
  }
}
