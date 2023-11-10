import { Component, inject, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from 'src/app/services/service';

@Component({
  selector: 'docs-events',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  standalone: false,
})
export class EventComponent {
  new: Boolean = false;
  @Output() eventSelect = new EventEmitter<any>();
  @Output() eventSend = new EventEmitter<any>();
  @Input() events: any[] | undefined;
  filteredEvents: any[] = [];
  startDate: string = '';
  endDate: string = '';
  constructor(private modalService: NgbModal,private service: PostService) {
  }
  http = inject(HttpClient);
  // private apiUrl = 'http://localhost:3000';
  private apiUrl = this.service.getPosts();
  items = this.service.getItems();
  selectedItem: any;
  status: string = '';
  formData: string = '';
  cards: any[] = [];
  selectedCard: { note: [] } | null = null;
  text = new FormControl('');



  getItems(): Observable<
    {
      image: string;
      name: string;
      DateTime: string;
      Location: string;
      note: [];
      status: string;
    }[]
  > {
    return this.http.get<
      {
        image: string;
        name: string;
        DateTime: string;
        Location: string;
        note: [];
        status: string;
      }[]
    >(this.apiUrl + '/post');
  }
  showItem(item: any) {
    this.selectedItem = item;
    console.log('Status is : ',this.selectedItem.status);
    this.service.news.next(true);

    this.eventSelect.emit(this.selectedItem);
  }
  action() {
    if (this.new == false) {
      this.service.news.next(true);
    } else {
      this.service.news.next(false);
    }
  }
}
