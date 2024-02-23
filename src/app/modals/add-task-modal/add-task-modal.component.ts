import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskModel} from "../../models/task.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent implements OnInit {

  @Output() taskAdded = new EventEmitter<any>();
  @Output() closeModalEvent = new EventEmitter<void>();

  taskForm: FormGroup;
  modalTitle: string;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddTaskModalComponent>) {
  }

  addTask() {
    if (this.taskForm.valid) {
      this.taskAdded.emit({ ...this.taskForm.value});
      this.taskForm.reset();
    }
  }

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
    });

    this.modalTitle = "Add Task";
  }
}
