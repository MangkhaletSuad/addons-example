import { NgModule } from '@angular/core';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './card.component';

@NgModule({
    declarations: [
        CardComponent
    ],
    imports: [
      NgbDatepickerModule,
      NgModule,
   

    ],
    bootstrap: [CardComponent],
    exports: [CardComponent]
})
export class CardModule { }