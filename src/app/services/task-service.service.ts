// task.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MockApiService } from './mock-api-service.service';
import { HttpClient } from "@angular/common/http";
import {TaskModel, TaskState} from "../models/task.model";

@Injectable({
    providedIn: 'root',
})
export class TaskService {
  private tasks: BehaviorSubject<TaskState> = new BehaviorSubject<TaskState>(null);
  private currentTask: TaskModel;

  constructor(private mockApiService: MockApiService, private http: HttpClient) {
    this.loadTasks();
  }

  getTasks() {
    if(this.tasks.value) {
      return this.tasks.asObservable()
    }
    return this.mockApiService.getTasks();
  }

  private loadTasks() {
    this.mockApiService.getTasks().subscribe(
      (response) => {
        this.tasks.next(response.tasks);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  deleteTask(task: TaskModel) {
    if (!this.tasks.value) {
      return;
    }
    const currentTasks = { ...this.tasks.value };
    for (const status of Object.keys(currentTasks)) {
      currentTasks[status] = currentTasks[status].filter(t => t.id !== task.id);
    }

    this.tasks.next(currentTasks);
  }

  getCurrentTask() {
    return this.currentTask;
  }

  setCurrentTask(task: TaskModel){
    this.currentTask = task;
  }
}

