import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { clickOnce, clickWaitHttp } from 'src/app/core/cache';
import { AppState, SUBJECT, SubjectService } from 'src/app/core';
import { DropDownOption, RelevanceTypeInfo, ServiceInfo } from 'src/app/service/model';
import { CommonService } from 'src/app/service/common.service';
import { ServiceListService } from 'src/app/service/service-list.service';

const ERROR_MSG = {
  serviceNameZh: {
    required: '請輸入服務名稱，內容限100字符',
    unique: '服務名稱已存在'
  },
  serviceCodeZh: {
    required: '請獲取服務編碼',
    pattern: '请输入6位数字',
    unique: '服務編碼已存在'
  },
  relevanceTypeZh: {
    required: '請選擇關聯類型',
    unique: '關聯類型已存在'
  },
  relevanceLengthZh: {
    required: '請輸入關聯字段長度',
    pattern: '請輸入不超過30的正整數'
  },
  relevanceNumZh: {
    required: '請輸入關聯字段分段'
  },
  targetEntityTypeZh: {
    required: '請輸入服務關聯目標'
  },
  serviceWordUrlFileName: {
    required: '請上傳服務說明文件',
    fileTypeError: '請上傳doc,docx格式文檔',
    uploadFailed: '上传失败，请重试'
  },
  descriptionZh: {
    required: '請輸入服務簡介，內容限2000字符'
  },
  relevanceSubsectionZh: {
    required: '請輸入關聯字段分段',
    pattern: '各段數值之和必須等於關聯字段項的輸入值'
  }
};

@Component({
  selector: 'app-service-form-cn',
  templateUrl: './service-form-cn.component.html',
  styleUrls: [ './service-form-cn.component.scss' ]
})
export class ServiceFormCnComponent implements OnInit, OnChanges, OnDestroy {
  @Output() associatedFieldSegmentsChange = new EventEmitter();
  @Output() multiSelectChange = new EventEmitter();
  @Output() relevanceLengthUpdate = new EventEmitter();
  @Output() serviceAssociationTargetChange = new EventEmitter();
  @Output() updataFildes = new EventEmitter();

  @Input() associationTypeList: Array<DropDownOption>;
  @Input() associatedFieldSegmentsList: Array<DropDownOption>;
  @Input() oldServiceDetail: ServiceInfo;
  @Input() relevanceList: Array<RelevanceTypeInfo>;
  @Input() serviceAssociationTargetList: Array<DropDownOption>;
  @Input() serviceDetail: ServiceInfo;

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  public errorMsg = ERROR_MSG;
  public relevanceTypeZh: Array<any>;

  private subscriptions: Subscription;

  constructor(
    private commonServ: CommonService,
    private serviceListServ: ServiceListService,
    private stateServ: AppState,
    private subjectServ: SubjectService,
    private translateServ: TranslateService
  ) {
    this.subscriptions = this.subjectServ.subscript(SUBJECT.ASSOCIATION_TYPE).subscribe((res) => {
      this.relevanceTypeZh = res && res.split(',').map(Number);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const serviceDetail = changes && changes.serviceDetail && changes.serviceDetail.currentValue;
    if (serviceDetail && serviceDetail.relevanceTypeZh) {
      console.log(serviceDetail && serviceDetail.relevanceTypeZh);

      this.relevanceTypeZh = serviceDetail.relevanceTypeZh.split(',').map(Number);
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // 自动获取服务编码
  handleAutoGetServiceCodeClick() {
    this.serviceListServ.generateServiceCode().success((success) => {
      const data = success && success.data;
      this.serviceDetail.serviceCodeZh = this.serviceDetail.serviceCodeEn = data;
    });
  }

  // 点击服务说明文件
  @clickOnce('ServiceFormComponent')
  handleInputFileClick(fileInput: HTMLInputElement) {
    // console.log(fileInput);
    fileInput.click();
  }

  // 改变关联类型
  handleMultiSelectChange(e) {
    const value = e && e.value;
    this.serviceDetail.relevanceTypeZh = value.join(',');
    const relevanceType = value.join(',');
    this.multiSelectChange.emit(this.serviceDetail.relevanceTypeZh);
    console.log(relevanceType);

    if (!relevanceType) {
      return;
    }
    this.serviceListServ
      .checkRelevanceTypeIdExist(relevanceType)
      .success((success) => {
        this.form.form.get('relevanceTypeZh').setErrors(null);
      })
      .error((error) => {
        this.form.form.get('relevanceTypeZh').setErrors({ unique: true });
      });
  }

  // 手动改变服务编码
  handleServiceCodeChange(serviceCode: string) {
    this.serviceDetail.serviceCodeZh = this.serviceDetail.serviceCodeEn = serviceCode;
  }

  // 上传服务说明文件
  @clickWaitHttp('handleServiceDescDocChange')
  handleServiceDescDocChange(event: UIEvent) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const fileName = target.files[0].name;
    this.serviceDetail.serviceWordUrlFileName = fileName;
    console.log(this.serviceDetail.serviceWordUrlFileName);

    return this.commonServ
      .getUploader()
      .setFile(target.files[0])
      .post({}, {})
      .success((res) => {
        console.log(res);
        const data = res && res.data;
        const filename = data && data.fileName;
        const filepath = data && data.filePath;
        const filePathArr = filepath.split('/');
        const fileUUID = filePathArr[filePathArr.length - 1];
        const fileUUIDArr = fileUUID.split('.');
        this.serviceDetail.serviceWordUrlFileName = filename;
        this.serviceDetail.serviceWordUrlZh = fileUUIDArr[0];
        this.form.form.get('serviceWordUrlFileName').setErrors(null);
      })
      .error(() => {
        target.value = null;
        this.form.form.get('serviceWordUrlFileName').setErrors({ uploadFailed: true });
      });
  }
}
