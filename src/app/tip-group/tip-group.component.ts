import {Component, Input, OnInit} from '@angular/core';
import { TipGroupsService } from "../tip-groups.service";
import {TipGroups} from "../tip-groups";
import {Tips} from "../tips";
import {TipsService} from "../tips.service";

@Component({
  selector: 'app-tip-group',
  templateUrl: './tip-group.component.html',
  styleUrls: ['./tip-group.component.css']
})
export class TipGroupComponent implements OnInit {
  @Input() tipsId: string;
  @Input() tipsName: string;

  public tips: Promise<Tips>;

  constructor(private tipsService: TipsService) {}

  ngOnInit(): void {
    this.tips = this.tipsService.getTipsByGroupId(this.tipsId);
  }

}
