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
import { clickOnce, clickWaitHttp } from 'src/app/core/cache';
import { AppState, SUBJECT, SubjectService } from 'src/app/core';
import { DropDownOption, RelevanceTypeInfo, ServiceInfo } from 'src/app/service/model';
import { CommonService } from 'src/app/service/common.service';
import { ServiceListService } from 'src/app/service/service-list.service';
import { Subscription } from 'rxjs';

const ERROR_MSG = {
  serviceNameEn: {
    required: 'Please input the name of service,limited to 300 words',
    unique: 'Service name already exist'
  },
  serviceCodeEn: {
    required: 'Please input service code',
    pattern: 'Please enter 6 digits',
    unique: 'Service code already exists'
  },
  relevanceTypeEn: {
    required: 'Please select link type',
    unique: 'Relevance type already exists'
  },
  relevanceLengthEn: {
    required: 'Please input link code length',
    pattern: 'Please input a positive integer no more than 30'
  },
  relevanceNumEn: {
    required: 'Please input link field partition'
  },
  targetEntityTypeEn: {
    required: 'Please enter the service link target.'
  },
  serviceWordUrlFileNameEn: {
    required: 'Please upload the file',
    fileTypeError: 'Please upload doc, docx format documents',
    uploadFailed: 'Upload failed, please try again.'
  },
  descriptionEn: {
    required: 'Please input brief introduction,limited to 2000 words'
  },
  relevanceSubsectionEn: {
    required: 'Please input link field partition',
    pattern: "The addition of digit's length in each section equals the length of link field"
  }
};

@Component({
  selector: 'app-service-form-en',
  templateUrl: './service-form-en.component.html',
  styleUrls: [ './service-form-en.component.scss' ]
})
export class ServiceFormEnComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  @Output() multiSelectChange = new EventEmitter();
  @Output() relevanceLengthUpdate = new EventEmitter();
  @Output() associatedFieldSegmentsChange = new EventEmitter();
  @Output() updataFildes = new EventEmitter();
  @Output() serviceAssociationTargetChange = new EventEmitter();

  @Input() associationTypeList;
  @Input() associatedFieldSegmentsList: Array<DropDownOption>;
  @Input() oldServiceDetail: ServiceInfo;
  @Input() serviceDetail: ServiceInfo;
  @Input() relevanceList: Array<RelevanceTypeInfo>;
  @Input() serviceAssociationTargetList: Array<DropDownOption>;

  public errorMsg = ERROR_MSG;
  public relevanceTypeEn: Array<any>;

  private subscriptions: Subscription;

  constructor(
    private commonServ: CommonService,
    private serviceListServ: ServiceListService,
    private stateServ: AppState,
    private subjectServ: SubjectService,
    private translateService: TranslateService
  ) {
    this.subscriptions = this.subjectServ.subscript(SUBJECT.ASSOCIATION_TYPE).subscribe((res) => {
      this.relevanceTypeEn = res && res.split(',').map(Number);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const serviceDetail = changes && changes.serviceDetail && changes.serviceDetail.currentValue;
    if (serviceDetail && serviceDetail.relevanceTypeEn) {
      this.relevanceTypeEn = serviceDetail.relevanceTypeEn.split(',').map(Number);
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
  @clickOnce('handleInputFileClick')
  handleInputFileClick(fileInput: HTMLInputElement) {
    console.log(fileInput);
    fileInput.click();
  }

  // 改变关联类型
  handleMultiSelectChange(e) {
    const value = e && e.value;
    this.serviceDetail.relevanceTypeEn = value.join(',');
    const relevanceType = value.join(',');
    this.multiSelectChange.emit(this.serviceDetail.relevanceTypeEn);
    console.log(relevanceType);

    if (!relevanceType) {
      return;
    }
    this.serviceListServ
      .checkRelevanceTypeIdExist(relevanceType)
      .success((success) => {
        this.form.form.get('relevanceTypeEn').setErrors(null);
      })
      .error((error) => {
        this.form.form.get('relevanceTypeEn').setErrors({ unique: true });
      });
  }

  // 手动改变服务编码
  handleServiceCodeChange(serviceCode: string) {
    this.serviceDetail.serviceCodeZh = this.serviceDetail.serviceCodeEn = serviceCode;
  }

  // 上传服务说明文件 --- 英文版
  @clickWaitHttp('handleServiceDescDocChange')
  handleServiceDescDocChange(event: UIEvent) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const fileName = target.files[0].name;
    this.serviceDetail.serviceWordUrlFileNameEn = fileName;

    return this.commonServ
      .getUploader()
      .setFile(target.files[0])
      .post({}, {})
      .success((res) => {
        const data = res && res.data;
        const filename = data && data.fileName;
        const filepath = data && data.filePath;
        const filePathArr = filepath.split('/');
        const fileUUID = filePathArr[filePathArr.length - 1];
        const fileUUIDArr = fileUUID.split('.');
        this.serviceDetail.serviceWordUrlFileNameEn = filename;
        this.serviceDetail.serviceWordUrlEn = fileUUIDArr[0];
        console.log(this.serviceDetail.serviceWordUrlEn);

        this.form.form.get('serviceWordUrlFileNameEn').setErrors(null);
      })
      .error(() => {
        target.value = null;
        this.form.form.get('serviceWordUrlFileNameEn').setErrors({ uploadFailed: true });
      });
  }
}
