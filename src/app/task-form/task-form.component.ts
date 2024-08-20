import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interface/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css', 

})
export class TaskFormComponent {
  task: Task = {
    id: 0,
    title: '',
    description: '',
    date: new Date(),
    completed: false,
  };

  constructor(private taskService: TaskService) {}

  addTask() {
    this.task.id = Date.now();
    this.taskService.addTask(this.task);
    this.resetForm();
  }

  resetForm() {
    this.task = {
      id: 0,
      title: '',
      description: '',
      date: new Date(),
      completed: false
    };
  }
}
