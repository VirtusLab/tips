import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tips} from "./tips";
import {Tip} from "./tip";

@Injectable({
  providedIn: 'root'
})
export class TipsService {
  private tipBaseUrl: string = "assets/tips/";
  private tipsSeparator: RegExp = /=======\n/
  public tips = {};

  constructor(private http: HttpClient) {}

  public getTipsByGroupId(groupId: string): Promise<Tips> {
    if (!(groupId in this.tips)) {
      this.tips[groupId] = this.parseTipFile(this.loadTipFile(groupId));
    }
    return this.tips[groupId];
  }

  private loadTipFile(tipsId: string): Promise<string> {
    return this.http.get(this.tipBaseUrl + tipsId + '.md', {responseType: 'text'}).toPromise();
  }

  private async parseTipFile(tipsFileContent: Promise<string>): Promise<Tips> {
    const content = await tipsFileContent;
    const splittedContent = content.split(this.tipsSeparator);
    const tips: Tips = [];
    for(let singleTipContent of splittedContent) {
      const splittedSingleTipContent = singleTipContent.split(/\n/);
      const tip: Tip = {
        name: splittedSingleTipContent[0],
        date: splittedSingleTipContent[1],
        content: splittedSingleTipContent.slice(3).join("\n")
      }
      tips.push(tip);
    }

    return tips;
  }
}
