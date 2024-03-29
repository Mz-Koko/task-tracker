// task.service.ts
import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, map, tap} from 'rxjs';
import { MockApiService } from './mock-api-service.service';
import { HttpClient } from "@angular/common/http";
import {TaskModel, TaskState} from "../models/task.model";

@Injectable({
    providedIn: 'root',
})
export class TaskService {
  private static tasks: BehaviorSubject<TaskState> = new BehaviorSubject<TaskState>(null);
  private currentTask: TaskModel;

  constructor(private mockApiService: MockApiService, private http: HttpClient) {
    this.loadTasks();
  }

  getTasks() {
    if(TaskService.tasks.value) {
      return TaskService.tasks.asObservable()
    }
    return this.mockApiService.getTasks().pipe(
      map(tasks => {
        TaskService.tasks.next(tasks);
        return tasks;
      })
    );
  }

  private loadTasks() {
    this.mockApiService.getTasks().subscribe(
      (response) => {
        TaskService.tasks.next(response.tasks);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  deleteTask(task: TaskModel, status) {
    if (!TaskService.tasks.value) {
      return;
    }

    let currentTasks = { ...TaskService.tasks.value };
    currentTasks[status] = currentTasks[status].filter(t => t.id !== task.id);

    // for (const status of Object.keys(currentTasks)) {
    //   currentTasks[status] = currentTasks[status].filter(t => t.id !== task.id);
    // }

    TaskService.tasks.next(currentTasks);
    this.reloadTasks.emit();
  }

  getCurrentTask() {
    return this.currentTask;
  }

  setCurrentTask(task: TaskModel){
    this.currentTask = task;
  }

  reloadTasks : EventEmitter<void> = new EventEmitter<void>();
}

