import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InputsComponent } from './components/inputs/inputs.component';
import { EditTaskModalComponent } from './modals/edit-task-modal/edit-task-modal.component';
import { AddTaskModalComponent } from './modals/add-task-modal/add-task-modal.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {OverlayModule} from "@angular/cdk/overlay";
import {ModalServiceServices, MyOverlayRef} from "./services/modal-services.service";
import { WarningModalComponent } from './modals/warning/warning-modal.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { TaskStateComponent } from './components/task-state/task-state.component';
import { TaskComponent } from './components/task/task.component';
import {DialogRef} from "@angular/cdk/dialog";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TaskBoardComponent,
    InputsComponent,
    EditTaskModalComponent,
    AddTaskModalComponent,
    WarningModalComponent,
    TaskStateComponent,
    TaskComponent
  ],
    // entryComponents:[AddTaskModalComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        OverlayModule,
        DragDropModule,
    ],
  providers: [
      ModalServiceServices,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
    {
      provide: MyOverlayRef,
      useValue: {}
    },
      // MatDialogRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
