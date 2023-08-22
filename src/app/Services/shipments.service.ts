import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { AuthService } from "./auth.service";

import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { BulkUpdate } from "../Models/ShipmentModel";

@Injectable({
  providedIn: 'root'
})

export class ShipmentService {

  private readonly scope: string = `${environment.apiBaseURL}/admin/shipments`;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ){}

  bulkUpdateShipments(shipmentData: any): Observable<BulkUpdate[]> {
    const headers = new HttpHeaders().append('Authorization', <string> this.authService.getAccessToken());
    return this.httpClient.post<BulkUpdate[]>(`${this.scope}/bulkupdate`, { results: shipmentData }, { headers });
  }

}
