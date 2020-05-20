import { saveAs } from 'file-saver';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service';
import { clickOnce } from 'src/app/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.scss' ]
})
export class UserDetailComponent implements OnInit {
  public userInfo: any;
  public userAuths: any;
  constructor(private activeRouter: ActivatedRoute, private userServ: UserService) {}

  ngOnInit() {
    this.activeRouter.queryParams.subscribe((params) => {
      if (params.userId) {
        this.userServ.getLCUserDetail(params.userId).success((res) => {
          this.userInfo = res.data;
        });
        this.userServ.getLCUserAuth(params.userId).success((res) => {
          this.userAuths = res.data;
          this.userAuths.forEach((elem) => {
            if (elem.blockInfo.blockIndustryInfos) {
              elem.industry = elem.blockInfo.blockIndustryInfos.map((industry) => industry.blockIndustryName).join(',');
            }
          });
        });
      }
    });
  }

  @clickOnce()
  handleDownloadClick(rowInfo: any) {
    saveAs(rowInfo.authFile);
  }
}
