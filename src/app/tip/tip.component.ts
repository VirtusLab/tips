import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.css']
})
export class TipComponent implements OnInit {
  @Input() tipName: string;
  @Input() tipDate: Date;
  @Input() tipContent: string;

  constructor() { }

  ngOnInit(): void {
  }

  formatDate(date: Date): string {
    // Unfortunately we must parse Date again because somewhere it's type is missing (and here is interpreted as string)
    let parsedDate = new Date(date)
    return parsedDate.toDateString()
  }

}
