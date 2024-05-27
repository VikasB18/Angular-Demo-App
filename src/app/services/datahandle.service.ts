import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { userData } from "../model/userData";
import { Observable } from "rxjs";

const myheader = new HttpHeaders({ "Content-Type": "application/json" });

@Injectable({
  providedIn: "root"
})
export class DatahandleService {
  url = "http://localhost:3000/userData";

  constructor(private http: HttpClient) {}

  insertData(registerData): Observable<userData> {
    return this.http.post<userData>(this.url, registerData, {
      headers: myheader
    });
  }

  getData(id: number): Observable<userData> {
    return this.http.get<userData>(this.url + "/" + id);
  }

  updateData(editData): Observable<userData> {
    return this.http.put<userData>(this.url + "/" + editData.id, editData, {
      headers: myheader
    });
  }

  updateProfileData(editProfileData): Observable<userData> {
    return this.http.patch<userData>(
      this.url + "/" + editProfileData.id,
      editProfileData,
      {
        headers: myheader
      }
    );
  }
}
