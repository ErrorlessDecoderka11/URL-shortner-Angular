import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class BitlyService {
  constructor(private http: HttpClient) {}
  shortenUrl(longUrl: string): Observable<{ link: string }> {
    return this.http.post<{ link: string }>(
      `${environment.api}/v4/shorten`,
      { long_url: longUrl },
      {
        headers: {
          Authorization: `Bearer ${environment.token}`,
          "Content-type": "application/json"
        }
      }
    );
  }
}
