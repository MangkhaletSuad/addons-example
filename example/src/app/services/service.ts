import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject,BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'http://192.168.51.109:23078/api/v1';
  private eventDataSubject = new BehaviorSubject<any[]>([]);
  eventData$ = this.eventDataSubject.asObservable();
  http = inject(HttpClient);
  items: {
    image: string;
    name: string;
    DateTime: string;
    Location: string;
    note: [];
    status: string;
  }[] = [];
  selectedItem: any;
  public news: Subject<Boolean> = new Subject<Boolean>();
  status: string = '';
  formData: string = '';
  cards: any[] = [];
  selectedCard: { note: [] } | null = null;
  text = new FormControl('');
  priorities = ['High', 'Medium', 'Low'];

  constructor(private httpClient: HttpClient, private modalService: NgbModal) {}


  getDataFromChild(event: any){
    console.log("you got data from child component :")
    console.log(event)
  }

  receiveData(event: any) {
    console.log("you got data from child component :")
    console.log(event)
  }
  
  
  getPosts() {
    // return this.httpClient.get(this.url);
    return this.url;
  }

  getItems() {
    return this.items;
  }

  selectedItems() {
    return this.selectedItem;
  }

  new() {
    return this.news;
  }

  fetchData() {
    this.http.get<any[]>(this.url).subscribe(data => {
      this.eventDataSubject.next(data);
    })
  }

}
