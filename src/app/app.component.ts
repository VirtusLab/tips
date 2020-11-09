import {Component, OnInit} from '@angular/core';
import {TipGroups} from "./tip-groups";
import {TipGroupsService} from "./tip-groups.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tips-of-the-day';

  public tipGroups: Promise<TipGroups>;

  constructor(private tipGroupsService: TipGroupsService) {}

  ngOnInit(): void {
    this.tipGroups = this.tipGroupsService.getTipGroups();
  }
}
