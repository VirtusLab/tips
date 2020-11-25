import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tips} from "./tips";
import {Tip} from "./tip";

@Injectable({
  providedIn: 'root'
})
export class TipsService {
  private tipBaseUrl: string = "assets/tips/";
  private tipsSeparator: RegExp = /^## /gm
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
    const splittedContent = content.split(this.tipsSeparator).slice(1);
    const tips: Tips = [];
    for(let singleTipContent of splittedContent) {
      const tip: Tip = {
        name: singleTipContent.match(/^\s*(.*)\s*\n/)[1],
        date: singleTipContent.match(/^###\s(.*)\s*$/m)[1],
        content: singleTipContent.split(/\n/).slice(1).filter(string => !string.match(/^###\s+/)).join("\n")
      }
      tips.push(tip);
    }

    return tips;
  }
}
