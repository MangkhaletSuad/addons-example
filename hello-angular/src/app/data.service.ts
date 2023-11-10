import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'localhost:3000'; // เปลี่ยนเป็น URL ของ db.json ของคุณ

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.apiUrl);
  }

  postData(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
