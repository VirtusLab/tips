import {Component, Input, OnInit} from '@angular/core';
import {Tips} from "../tips";
import {TipsService} from "../tips.service";

@Component({
  selector: 'app-tip-group',
  templateUrl: './tip-group.component.html',
  styleUrls: ['./tip-group.component.css']
})
export class TipGroupComponent implements OnInit {
  @Input() tipGroupId: string;
  @Input() tipGroupName: string;

  public tips: Promise<Tips>;

  permalinkVisible: boolean = false;

  constructor(private tipsService: TipsService) {}

  ngOnInit(): void {
    this.tips = this.tipsService.getTipsByGroupId(this.tipGroupId);
  }

  showPermalinkElement(show: boolean) {
    this.permalinkVisible = show;
  }

  // DO NOT CHANGE THIS METHOD - it can break backward compatibility - present permalinks can stop works
  tipPermalinkName(): string {
    return this.tipGroupId;
  }

}
