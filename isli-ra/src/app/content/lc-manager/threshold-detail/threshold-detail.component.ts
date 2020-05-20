import { GlobalValidService } from 'mpr-form-valid';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState, clickOnce, clickWaitHttp } from 'src/app/core';
import { Location } from '@angular/common';
import { Threshold, ThresholdService } from 'src/app/service';

@Component({
  selector: 'app-threshold-detail',
  templateUrl: './threshold-detail.component.html',
  styleUrls: [ './threshold-detail.component.scss' ]
})
export class ThresholdDetailComponent implements OnInit {
  public errMsg = {
    prewarningValue: {
      required: 'lcManager.valid.prewarningValue.requred',
      max: 'lcManager.valid.prewarningValue.requred',
      min: 'lcManager.valid.prewarningValue.requred'
    },
    thresholdValue: {
      required: 'lcManager.valid.thresholdValue.requred'
    }
  };
  public threshold = new Threshold();
  constructor(
    private router: Router,
    private thresholdServ: ThresholdService,
    private globalValidServ: GlobalValidService,
    private activeRoute: ActivatedRoute,
    private stateServ: AppState,
    private locationServ: Location
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      if (!params.id) {
        this.locationServ.back();
        return;
      }
      this.threshold = this.stateServ.get('threshold-tmp');
      if (!this.threshold) {
        this.locationServ.back();
      }
    });
  }

  @clickWaitHttp('handleSubmitClick')
  handleSubmitClick() {
    if (!this.globalValidServ.validAll()) {
      return;
    }
    return this.thresholdServ.updateThreshold(this.threshold).success(() => {
      this.router.navigate([ 'threshold' ], { relativeTo: this.activeRoute.parent, queryParams: { reload: true } });
    });
  }

  @clickOnce()
  handleCancelClick() {
    this.router.navigate([ 'threshold' ], { relativeTo: this.activeRoute.parent });
  }
}
