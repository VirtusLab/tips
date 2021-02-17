import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.css']
})
export class TipComponent {
  @Input() tipName: string;
  @Input() tipDate: Date;
  @Input() tipContent: string;
  @Input() tipGroupId: string;

  permalinkVisible: boolean = false;

  constructor() { }

  formatDate(date: Date): string {
    // Unfortunately we must parse Date again because somewhere it's type is missing (and here is interpreted as string)
    let parsedDate = new Date(date)
    return parsedDate.toDateString()
  }

  // DO NOT CHANGE THIS METHOD - it can break backward compatibility - present permalinks can stop works
  tipPermalinkName(): string {
    return this.tipGroupId + '/' +
      this.tipName
        .replace(/[^a-zA-Z0-9\-\/ ]/g, "")
        .replace(/ - |\/| /g, "-")
        .toLowerCase()
  }

  showPermalinkElement(show: boolean) {
    this.permalinkVisible = show;
  }

}
