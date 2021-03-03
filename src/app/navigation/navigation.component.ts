import { Component, OnInit } from '@angular/core';
import {EasingLogic} from "ngx-page-scroll-core";
import {TipGroupsService} from "../tip-groups.service";
import {TipGroups} from "../tip-groups";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public tipGroups: Promise<TipGroups>;

  public isMobileNavigationOpened: boolean = false;

  constructor(private tipGroupsService: TipGroupsService) {}

  ngOnInit(): void {
    this.tipGroups = this.tipGroupsService.getTipGroups();
  }

  closeMobileNavigation(): void {
    this.isMobileNavigationOpened = false;
  }

  toggleMobileNavigation(): void {
    this.isMobileNavigationOpened = !this.isMobileNavigationOpened;
  }

  public inOutExpoEasing: EasingLogic = (t: number, b: number, c: number, d: number): number => {
    if (t === 0) {
      return b;
    }
    if (t === d) {
      return b + c;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    }

    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }

}
