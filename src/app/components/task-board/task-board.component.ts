import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TaskService} from "../../services/task-service.service";
import {TaskState} from "../../models/task.model";

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent {

  tasks: TaskState = {};
  columns = ['Open', 'Pending', 'In Progress', 'Completed'];

  constructor(private taskService: TaskService, public dialog: MatDialog) {
    taskService.reloadTasks.subscribe(_ => {
      this.loadTasks();
    })
  }

  private loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnInit() {
    this.loadTasks();
  }
}
