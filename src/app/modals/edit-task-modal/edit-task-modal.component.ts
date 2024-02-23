import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskModel} from "../../models/task.model";
import {TaskService} from "../../services/task-service.service";
import {MyOverlayRef} from "../../services/modal-services.service";

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss']
})
export class EditTaskModalComponent implements OnInit{
  @Output() taskAdded = new EventEmitter<any>();
  @Output() closeModalEvent = new EventEmitter<void>();

  taskForm: FormGroup;
  modalTitle: string;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EditTaskModalComponent>, public taskService: TaskService,
              @Inject(MAT_DIALOG_DATA) public data: { task: TaskModel, isEditing: boolean, title: string }) {
  }

  editTask() {
    if (this.taskForm.valid) {
      const editedTask = { ...this.taskForm.value, id: this.data.task.id };
      this.taskAdded.emit(editedTask);
      this.taskForm.reset();
      this.closeDialog();
    }
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
  closeDialog() {
    console.log('Closing dialog...');
    this.dialogRef.close();
    this.closeModalEvent.emit();
  }

  ngOnInit() {

    this.data.task = this.taskService.getCurrentTask();
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
    });

    // Initialize the form with the task data
    this.taskForm.patchValue(this.data.task);

    this.modalTitle = this.data.title;
  }
}
