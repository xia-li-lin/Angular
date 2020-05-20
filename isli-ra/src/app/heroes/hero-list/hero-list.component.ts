import { Component, OnInit } from '@angular/core';
import { HEROES } from 'src/app/mock/hero.mock';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  public heroes=HEROES;

  constructor() { }

  ngOnInit() {
  }

}
