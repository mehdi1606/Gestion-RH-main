import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';
import { FullCalendarModule } from '@fullcalendar/angular';  // step 1
import { WidgetModule } from './widget/widget.module';
import { CalendarComponent } from '../pages/calendar/calendar.component';
import { CollaborateurModalComponent } from '../pages/Collaborateur/modals/collaborateur-modal/collaborateur-modal.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CollaborateurModalComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule, // step 3
    UIModule,
    WidgetModule
  ],
  exports: [
   CalendarComponent,
   CollaborateurModalComponent
    // step 4
  ]
})

export class SharedModule { }
