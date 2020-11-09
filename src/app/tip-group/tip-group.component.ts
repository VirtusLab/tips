import {Component, Input, OnInit} from '@angular/core';
import { TipGroupsService } from "../tip-groups.service";
import {TipGroups} from "../tip-groups";

@Component({
  selector: 'app-tip-group',
  templateUrl: './tip-group.component.html',
  styleUrls: ['./tip-group.component.css']
})
export class TipGroupComponent implements OnInit {
  @Input() tipsId: string;
  @Input() tipsName: string;

  constructor() {}

  ngOnInit(): void {
  }

}
