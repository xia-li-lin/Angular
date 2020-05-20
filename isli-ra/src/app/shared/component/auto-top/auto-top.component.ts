import { Component, OnInit, HostListener } from '@angular/core';
import scrollIntoView from 'dom-scroll-into-view';

@Component({
  selector: 'app-auto-top',
  templateUrl: './auto-top.component.html',
  styleUrls: [ './auto-top.component.scss' ]
})
export class AutoTopComponent implements OnInit {
  public showTop = false;
  constructor() {}

  ngOnInit() {}

  // ngAfterViewInit(): void {
  //   //Called after every check of the component's view. Applies to components only.
  //   //Add 'implements AfterViewChecked' to the class.
  //   const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  //   this.showTop = scrollTop > 100;
  // }

  @HostListener('window:scroll', [ '$event' ])
  bindWindowScroll(event) {
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    this.showTop = scrollTop > 100;
    return true;
  }

  handleAutoTopClick() {
    if (window.scrollTo) {
      window.scrollTo({ top: 0, left: 0 });
    } else {
      document.body.scrollTop = 0;
    }
  }
}
