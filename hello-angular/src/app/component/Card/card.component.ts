import { Component, PipeTransform, inject, OnChanges, SimpleChanges, EventEmitter, Input, Output, OnInit  } from '@angular/core';
import { NgbDate, NgbDateStruct, NgbModal, ModalDismissReasons,NgbCalendar  } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from 'src/app/services/service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/data.service';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

interface Event {
  id: string;
  status: string;
  image: string;
  name: string;
  DateTime: string;
  Location: string;
  note: { id: string; content: string }[];
}
@Component({
  selector: 'docs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false
})

export class CardComponent implements PipeTransform, OnChanges, OnInit {
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Output() minDateChange = new EventEmitter<Date | null>();
  @Output() maxDateChange = new EventEmitter<Date | null>();
  selectedItems: any;
  items = this.service.getItems();
  data = this.service.getPosts();
  private apiUrl = this.service.getPosts();
  transform(items: any[], dateFilter: string): any {
    if (!items || !dateFilter) {
      return items;
    }
    const selectedDate = new Date(dateFilter);
  
    return items.filter(item => {
      const itemDate = new Date(item.DateTime);
  
      // เปรียบเทียบวันที่ของรายการกับ selectedDate
      return (
        itemDate.getFullYear() === selectedDate.getFullYear() &&
        itemDate.getMonth() === selectedDate.getMonth() &&
        itemDate.getDate() === selectedDate.getDate()
      );
    });
  }

  constructor(private modalService: NgbModal, private service: PostService,private dataService: DataService) { 
    this.Test.subscribe((data) => {
      this.selectedItems = 'DateTime:', data;
    })

  }
  new: Boolean = false;
  http = inject(HttpClient);
  Test = of(this.service.getItems());
  selectedDate: any;
  filteredItems: any;
  datetest= '';

  jsonDataList: any[] = []; 
  filteredData: any[] = [];
  //filterForm: FormGroup; 
  selectedStartDate: Date | undefined;
  selectedEndDate: Date | undefined;

  dateFilters: {
    createDateStart: string;
    createDateEnd: string;
    expireDateStart: string;
    expireDateEnd: string;
  } = {
    createDateStart: '',
    createDateEnd: '',
    expireDateStart: '',
    expireDateEnd: ''
  };
  
  showCard = false;
  closeCard = true;

  closeResult = '';

  status1Opacity: string = '1';
  status2Opacity: string = '1';
  status3Opacity: string = '1';


  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });

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

  events: Event[] = [];
  ngOnInit() {
    this.service.fetchData();
    this.service.eventData$.subscribe(data => {
      this.events = data;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedItem'] && changes['selectedItem'].currentValue) {
      this.updateStatusOpacity();
    }
  }

  updateStatusOpacity() {
    // Create a temporary variable to access 'selectedItem'
    const selectedItem = this.selectedItems;

  // Set opacity values based on 'selectedItem.status'
  if (selectedItem) {
    if (this.selectedItems.status === 'status 1') {
      this.status1Opacity = '0.5';
      this.status2Opacity = '1';
      this.status3Opacity = '1';
    } else if (selectedItem.status === 'status 2') {
      this.status1Opacity = '1';
      this.status2Opacity = '0.5';
      this.status3Opacity = '1';
    } else if (selectedItem.status === 'status 3') {
      this.status1Opacity = '1';
      this.status2Opacity = '1';
      this.status3Opacity = '0.5';
    }
  }
  }
  onMinDateChange() {
    this.minDateChange.emit(this.minDate);
  }

  onMaxDateChange() {
    this.maxDateChange.emit(this.maxDate);
  }

  filterDareRange(){
    if (this.minDate && this.maxDate) {
      const minDateObj = new Date(this.minDate);
      const maxDateObj = new Date(this.maxDate);
    
      const filteredData = this.items.filter(data => {
        const itemDate = new Date(`${data.DateTime.toString()}`)
        return itemDate >= minDateObj && itemDate <= maxDateObj;
      })
      console.log(filteredData);
    } else {
      alert('Please select both minDate and maxDate');
    }

  }

  open(content1: any) {
    console.log(this.selectedItems);
    const modalRef = this.modalService.open(content1);
    modalRef.result.then((result) => {
      if (result === 'Save click') {
        console.log('Save');

        const itemDateTimes = this.selectedItems.map((item:any) => item.DateTime);

        const itemDates = itemDateTimes.map((dateTime:any) => new Date(dateTime));
        const formattedDate = `${this.selectedDate.day.toString().padStart(2, '0')}/${this.selectedDate.month.toString().padStart(2, '0')}/${this.selectedDate.year}`;

        this.filteredItems = itemDates.filter((itemDate:any) => {
          // console.log(this.items.DateTime);
          return (
            itemDate.getDate() === formattedDate
          );
        });
        // console.log(this.items[0].DateTime);
        console.log(`input date is :`)
        console.log(this.selectedDate)
        this.selectedItems.forEach((item:any)=> console.log(`date time is ${this.selectedItems.DateTime}`))
        // this.filteredItems.forEach((item:any) => {
        //   console.log(item.name); 
        //   console.log(item.DateTime);
        // });
      }
    });
  }

  // open(content1: any) {
  //   this.modalService
  //     .open(content1, { ariaLabelledBy: 'modal-basic-title' })
  //     .result.then(
  //       (result) => {
  //         this.closeResult = `Closed with: ${result}`;
  //       },
  //       (reason) => {
  //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //       }
  //     );
  //     if (this.items === this.selectedDate) {
  //       console.log('Success Filter : ', this.selectedDate );
  //     }
  //     console.log(this.items);
  //   }
  }