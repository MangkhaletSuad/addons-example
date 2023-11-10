import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from 'src/app/services/service';

@Component({
    selector: 'card-event',
    templateUrl: './card-event.component.html',
    styleUrls: ['./event.component.scss'],
    standalone: false,
})

export class CardeventComponent {
  new: Boolean = false;
  selectedItems:any;
    constructor (private modalService: NgbModal,private service: PostService){
      this.service.news.subscribe(data =>{
        this.new = data;
      })
      // this.service.selectedItem.subscribe((data: any) => {
      //   this.selectedItems = data;
      //   console.log('Item is:',data);
      // })
    }
    http = inject(HttpClient);
    status: string = '';
    formData: string = '';
    cards: any[] = [];
    selectedCard: { note: [] } | null = null;
    text = new FormControl('');
    items = this.service.getItems();
    private apiUrl = this.service.getPosts();
    selectedPriority: string = 'High';
    Serverity = this.service.priorities;
    
    alert() {
      return alert(this.selectedItems.name);
    }

    changeAccept() {
      if (this.selectedItems) {
        const st = { status: this.status };
        if (
          this.selectedItems.status === 'status 1' ||
          this.selectedItems.status === 'status 3'
        ) {
          this.selectedItems.status = 'status 2';
          this.http
            .put(this.apiUrl + '/post/' + this.selectedItems.id, this.selectedItems)
            .subscribe(
              (response: any) => {
                // การส่งข้อมูลสำเร็จ
                console.log('Data sent successfully', response);
              },
              (error: any) => {
                // เกิดข้อผิดพลาดขณะส่งข้อมูล
                console.error('Error sending data', error);
              }
            );
        } else {
          this.status = 'status 1';
        }
      }
    }
    changeClose() {
      if (this.selectedItems) {
        const st = { status: this.status };
        if (
          this.selectedItems.status === 'status 1' ||
          this.selectedItems.status === 'status 2'
        ) {
          this.selectedItems.status = 'status 3';
          this.http
            .put(this.apiUrl + '/post/' + this.selectedItems.id, this.selectedItems)
            .subscribe(
              (response: any) => {
                // การส่งข้อมูลสำเร็จ
                console.log('Data sent successfully', response);
              },
              (error: any) => {
                // เกิดข้อผิดพลาดขณะส่งข้อมูล
                console.error('Error sending data', error);
              }
            );
        } else {
          this.status = 'status 1';
        }
      }
    }

    getIconUrl() {
      if (this.selectedPriority === 'High') {
        return 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
        <g id="Group_17871" data-name="Group 17871" transform="translate(-941 56)">
          <path id="high" d="M3.5,9.9a1.076,1.076,0,0,1-1.4-.3,1.034,1.034,0,0,1,.4-1.4l5-3a.908.908,0,0,1,1,0l5,3a1.012,1.012,0,1,1-1.1,1.7L8,7.2Z" transform="translate(945.536 -51.059)" fill="#ff5630"/>
          <rect id="Rectangle_149475" data-name="Rectangle 149475" width="25" height="25" transform="translate(941 -56)" fill="none"/>
        </g>
      </svg>`);
      } else if (this.selectedPriority === 'Medium') {
          return 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
          <g id="Group_17874" data-name="Group 17874" transform="translate(-998 56)">
            <g id="icon_x2F_16px_x2F_medium-priority-" transform="translate(1003 -51)">
              <g id="Group_41" data-name="Group 41">
                <path id="Path_47" data-name="Path 47" d="M3,4H13a.945.945,0,0,1,1,1,.945.945,0,0,1-1,1H3A.945.945,0,0,1,2,5,.945.945,0,0,1,3,4Zm0,6H13a.945.945,0,0,1,1,1,.945.945,0,0,1-1,1H3a.945.945,0,0,1-1-1A.945.945,0,0,1,3,10Z" fill="#ffab00"/>
              </g>
            </g>
            <rect id="Rectangle_149476" data-name="Rectangle 149476" width="25" height="25" transform="translate(998 -56)" fill="none"/>
          </g>
        </svg>
        `);
      } else if (this.selectedPriority === 'Low') {
          return 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
          <g id="Group_17873" data-name="Group 17873" transform="translate(-1087 56)">
            <path id="low" d="M12.5,6.1a1.012,1.012,0,0,1,1.4.4.929.929,0,0,1-.3,1.3l-5,3a.908.908,0,0,1-1,0l-5-3a.843.843,0,0,1-.4-1.3.9.9,0,0,1,1.3-.4L8,8.8l4.5-2.7Z" transform="translate(1091.46 -51.955)" fill="#0065ff"/>
            <rect id="Rectangle_149478" data-name="Rectangle 149478" width="25" height="25" transform="translate(1087 -56)" fill="none"/>
          </g>
        </svg>`);
      } else {
          return '';
      }
    }
    
    deleteCard(i: number) {
      if (
        !this.selectedItems ||
        !this.selectedItems.note ||
        i < 0 ||
        i >= this.selectedItems.note.length
      ) {
        return;
      }
      const selectedCard = this.selectedItems.note[i];
      const cardIndex = this.selectedItems.note.indexOf(selectedCard);
      if (cardIndex !== -1) {
        this.selectedItems.note.splice(cardIndex, 1);
      }
      // this.selectedItems.note.splice(i, 1);
      this.http
        .put(this.apiUrl + '/post/' + this.selectedItems.id, this.selectedItems)
        .subscribe(
          (response: any) => {
            console.log('Data sent successfully', response);
          },
          (error: any) => {
            console.error('Error sending data', error);
          }
        );
    }
    deleteLastNote() {
      if (!this.selectedItems || !this.selectedItems.note || this.selectedItems.note.length === 0) {
        return;
      }
    
      const lastIndex = this.selectedItems.note.length - 1;
      this.selectedItems.note.splice(lastIndex, 1);
    
      this.http
        .put(this.apiUrl + '/post/' + this.selectedItems.id, this.selectedItems)
        .subscribe(
          (response: any) => {
            console.log('Data sent successfully', response);
          },
          (error: any) => {
            console.error('Error sending data', error);
          }
        );
    }
    
    onCardSelect(card: { note: [] }) {
      this.selectedCard = card;
    }
  
    closeResult = '';
  
    submit(content2: any) {
      this.modalService.open(content2, { ariaLabelledBy: 'modal' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    }
    saveData() {
      const noteId = Date.now().toString();
      const note = { id: noteId, content: this.text.value };
  
      if (this.selectedItems) {
        // อัปเดตข้อมูลใน selectedItem โดยเพิ่ม note ลงในรายการนี้
        this.selectedItems.note.push(note);
  
        this.http
          .put(this.apiUrl + '/post/' + this.selectedItems.id, this.selectedItems)
          .subscribe(
            (response: any) => {
              console.log('Data sent successfully', response);
  
              // เพิ่ม note ใน cards
              this.cards.push(note);
            },
            (error: any) => {
              console.error('Error sending data', error);
            }
          );
        this.cards.push(note);
        this.text.setValue('');
      }
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
}