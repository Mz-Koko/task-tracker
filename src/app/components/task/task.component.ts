import {Component, Input} from '@angular/core';
import {TaskModel, TaskState} from "../../models/task.model";
import {TaskService} from "../../services/task-service.service";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskModalComponent} from "../../modals/edit-task-modal/edit-task-modal.component";
import {WarningModalComponent} from "../../modals/warning/warning-modal.component";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
    isDropdownOpen: boolean;

    constructor(private taskService: TaskService, public dialog: MatDialog) {
    }

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

  openTaskModal() {
    this.taskService.setCurrentTask(this.task);

    let dialogRef = this.dialog.open(EditTaskModalComponent, {
      backdropClass: 'blur-background',
      hasBackdrop: true,
      data: { task: this.task, isEditing: true, title: 'Edit Task' },
    });
    this.isDropdownOpen = false;
    dialogRef.componentInstance.taskAdded.subscribe((editedTask: TaskModel) => {
      this.task = editedTask;
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }

    @Input()
    task: TaskModel;

    @Input()
    key: string;

  deleteTaskModal() {
    let dialogRef = this.dialog.open(WarningModalComponent, {
      backdropClass: 'blur-background',
      hasBackdrop: true,
      data: { task: this.task, isEditing: true, title: 'Delete Task', subtitle: 'Are you sure you want to delete this task?' },
    });
    this.isDropdownOpen = false;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        console.log(this.task.id, 'id', this.task);
        this.taskService.deleteTask(this.task, this.key);
      }
    });
  }



}
