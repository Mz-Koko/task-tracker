import {Component, Input} from '@angular/core';
import {TaskModel, TaskState} from "../../models/task.model";
import {ModalServiceServices, MyOverlayRef} from "../../services/modal-services.service";
import {AddTaskModalComponent} from "../../modals/add-task-modal/add-task-modal.component";
import {TaskService} from "../../services/task-service.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-task-state',
  templateUrl: './task-state.component.html',
  styleUrls: ['./task-state.component.scss'],

})
export class TaskStateComponent {
    isDropdownOpen: boolean;
  constructor(private taskService: TaskService, public dialog: MatDialog, private modalServiceServices: ModalServiceServices) {
  }

    addTaskModal() {
      const dialogRef = this.dialog.open(AddTaskModalComponent,
        {
          backdropClass: 'blur-background',
          hasBackdrop: true,
        });
      dialogRef.componentInstance.taskAdded.subscribe((newTask: TaskModel) => {
        newTask.id = this.tasks.length + 1;
        newTask.reference = this.tasks + "6";
        this.tasks.push(newTask);
      })
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
        }
      });
    }

    @Input()
    status: string;

    @Input()
    color: string;

    @Input()
    key: string;

    @Input()
    showAdd: boolean = false;

    @Input()
    tasks? : TaskModel[] = [];
}
