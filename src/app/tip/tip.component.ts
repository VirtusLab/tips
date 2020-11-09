import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.css']
})
export class TipComponent implements OnInit {
  @Input() tipName: string;
  @Input() tipDate: string;
  @Input() tipContent: string;
  constructor() { }

  ngOnInit(): void {
  }

}
