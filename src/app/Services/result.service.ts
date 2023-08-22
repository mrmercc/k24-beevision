import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { BaseResult, Result } from "../Models/ResultModel";

@Injectable({
  providedIn: 'root'
})

export class ResultService {

  private readonly beeVisionApiURL:string = environment.beeVisionBaseURL;

  constructor(
    private httpClient: HttpClient
  ){}

  getResults(date: string | Date, includeImages:boolean = false): Observable<BaseResult> {
    const params = new HttpParams().set('date', date as string).set('includeImages', includeImages)

    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    // headers = headers.append('Connection', 'keep-alive')

    return this.httpClient.get<BaseResult>(`${this.beeVisionApiURL}/getMeasurement`, { params, headers });
  }

}
