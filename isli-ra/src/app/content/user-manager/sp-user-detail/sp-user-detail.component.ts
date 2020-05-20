import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service';

@Component({
  selector: 'app-sp-user-detail',
  templateUrl: './sp-user-detail.component.html',
  styleUrls: [ './sp-user-detail.component.scss' ]
})
export class SpUserDetailComponent implements OnInit {
  public userInfo: any;
  constructor(private activeRoute: ActivatedRoute, private userServ: UserService) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.userId) {
        this.userServ.getSPUserDetail(params.userId).success((res) => {
          this.userInfo = res.data;
        });
      }
    });
  }
}
