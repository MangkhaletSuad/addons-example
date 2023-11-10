// import { Component, OnInit, inject, ViewChild, AfterViewInit,Renderer2, ElementRef } from '@angular/core';
// import { PostService } from './services/service';
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
// })
// export class AppComponent implements OnInit, AfterViewInit {
//   @ViewChild('cardTest') cardTest:any;
//   @ViewChild('event') event: any;
//   @ViewChild('card_event') card_event:any;
//   constructor(
//     private socketClientService: SocketClientService,private service: PostService
//   ) {
//   }
//   title = 'my-app';
//   message: string = '';
//   receivedData: any[] = [];
//   news = false;
//   getDataFromChilds = this.service.getDataFromChild(event);

//   getDataFromChild(event:any) {
//     const data = event.selectedItem
//     console.log('getDataFromChild is: ',data)
//     this.card_event.selectedItems= data
//     this.cardTest.selectedItems= data
//     // return this.getDataFromChild;
//   }
  

//   ngOnInit(): void {
//     this.socketClientService.connect();
//     this.socketClientService.on('events', (socket: any) => {
//       console.log(socket);
//     });
//     const ros = this.socketClientService.listenforMessages((message: string)=> {
//       this.socketClientService.emit('message',message);
//       console.log(message);
//     })
//     this.socketClientService.onWebSocketEvent().subscribe((res: any) => {
//       this.receivedData.push(res);
//     });
//   }

//   ngAfterViewInit(): void {
//         this.event.getItems().subscribe({
//           next: (value: any) => {
//             this.event.items = value;
//             // console.log(this.event.items)
//           },
//         });
//         console.log('Test Test: ',this.event);
//         this.cardTest.getItems().subscribe({
//           next: (value: any) => {
//             this.cardTest.items = value;
//             // console.log(this.event.items)
//           },
//         });
//   }

//   sendMessage(message: string) {
//     if (message) {
//       this.socketClientService.sendMessage(message);
//     }
//   }

//   toggleCard() {
//     this.cardTest.closeCard = !this.cardTest.closeCard
//     this.cardTest.showCard = !this.cardTest.showCard
//   }

// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}
  title = 'my-app';
    message: string = '';
  ngOnInit() {
    this.getDataFromAPI();
  }

  private apiUrl = 'http://localhost:3000';
  fileContent: string = '';
  fileContentArray: { text: string; isChecked: boolean }[] = [];

  linesToRead: number = 10;

  public onChange(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;

    fileReader.onloadend = function (x) {
      const lines = (fileReader.result as string).split('\n');

      const selectedLines = lines.slice(0, self.linesToRead);

      self.fileContentArray = selectedLines.map((line) => ({
        text: line,
        isChecked: false,
      }));
    };

    fileReader.readAsText(file);
  }
  
  getDataFromAPI() {
    this.http.get(`${this.apiUrl}/api/data`).subscribe(
      (data: any) => {
        console.log('ข้อมูลจาก API:', data);
        this.fileContent = data?.hangar;
      },
      (error) => {
        console.error('เกิดข้อผิดพลาดในการเรียก API:', error);
      }
    );
  }
}

