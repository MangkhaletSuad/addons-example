import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
// import { CardComponent } from './component/Card/CardComponent';
import { CardComponent } from './component/Card/card.component';
import { EventComponent } from './component/Event/event.component';
import { CardeventComponent } from './component/Event/card-event.component';
import { PostService } from './services/service';
// Import other necessary modules from Angular Material
@NgModule({
  declarations: [
    AppComponent,CardComponent,EventComponent,CardeventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }