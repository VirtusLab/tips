import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {TipGroups} from "./tip-groups";

@Injectable({
  providedIn: 'root'
})
export class TipGroupsService {

  private groupsUrl: string = "assets/tips/tip-groups.json"
  private readonly tipGroups: Promise<TipGroups>;

  constructor(private http: HttpClient) {
    this.tipGroups = this.loadGroups();
  }

  private loadGroups(): Promise<TipGroups> {
    return this.http.get<TipGroups>(this.groupsUrl).toPromise();
  }

  public getTipGroups(): Promise<TipGroups> {
    return this.tipGroups;
  }
}
