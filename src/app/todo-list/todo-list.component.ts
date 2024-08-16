import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interface/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  tasks = this.taskService.tasks$;
  editMode: { [key: number]: boolean } = {};
  editedTitle: { [key: number]: string } = {};
  editedDescription: { [key: number]: string } = {}; // Añadido

  constructor(private taskService: TaskService) {}

  addTask() {
    const newTask: Task = {
      id: Date.now(),
      title: 'New Task',
      description: '', // Añadido
      completed: false
    };
    this.taskService.addTask(newTask);
  }

  toggleTaskCompletion(taskId: number) {
    this.taskService.toggleTaskCompletion(taskId);
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
  }

  toggleEditMode(taskId: number, title: string, description: string) {
    this.editMode[taskId] = !this.editMode[taskId];
    this.editedTitle[taskId] = title;
    this.editedDescription[taskId] = description; // Añadido
  }

  saveEdit(taskId: number) {
    this.taskService.editTask(taskId, {
      title: this.editedTitle[taskId],
      description: this.editedDescription[taskId] // Añadido
    });
    this.toggleEditMode(taskId, '', ''); // Reset edit mode after saving
  }

  cancelEdit(taskId: number) {
    this.toggleEditMode(taskId, '', ''); // Reset edit mode
  }
}
