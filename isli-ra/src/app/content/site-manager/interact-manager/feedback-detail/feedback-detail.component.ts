import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedBackService, FeedBack } from 'src/app/service';
import { clickOnce } from 'src/app/core';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: [ './feedback-detail.component.scss' ]
})
export class FeedbackDetailComponent implements OnInit {
  public feedBack = new FeedBack();
  public imgUrl = '';

  constructor(private feedBackService: FeedBackService, private activeRoute: ActivatedRoute, private router: Router) {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.id) {
        this.getDetails(params.id);
      }
    });
  }

  ngOnInit() {}

  // 返回
  @clickOnce()
  public hadleBack() {
    this.router.navigate([ '/content/site/interact/feedbacks' ]);
  }

  private getDetails(id) {
    this.feedBackService
      .getFeedBackDetail(id)
      .success((res) => {
        this.feedBack = res.data.feedBackVo;
        if (this.feedBack.imageFile) {
          this.imgUrl = res.data.rootPath + '/' + this.feedBack.imageFile.filePath;
        }
      })
      .error((res) => {
        console.log(res);
      });
  }
}
