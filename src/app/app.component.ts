import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TipGroups} from "./tip-groups";
import {TipGroupsService} from "./tip-groups.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'tips-of-the-day';

  public tipGroups: Promise<TipGroups>;

  private permalinkScrollRetryCountdown: number = 30;

  constructor(private tipGroupsService: TipGroupsService) {}

  ngOnInit(): void {
    this.tipGroups = this.tipGroupsService.getTipGroups();
  }

  ngAfterViewInit(): void {
    this.scrollToPermalinkIfExist();
  }

  private scrollToPermalinkIfExist(): void {
    const hash = window.location.hash.substr(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({behavior: "smooth"})
        } else if (this.permalinkScrollRetryCountdown > 0) {
          this.permalinkScrollRetryCountdown--;
          this.scrollToPermalinkIfExist();
        }
        }, 500);
    }
  }
}
