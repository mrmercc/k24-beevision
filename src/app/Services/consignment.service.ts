import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ConsignmentService {

  private readonly scope: string = `${environment.apiBaseURL}/admin`;

  constructor(
    private httpClient: HttpClient
  ){}
}
