import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../interface/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSignal = signal<Task[]>(this.loadTasksFromLocalStorage());

  tasks$ = computed(() => this.tasksSignal());

  constructor() {
    this.loadTasksFromLocalStorage();
  }

  addTask(task: Task) {
    this.tasksSignal.update(tasks => {
      const updatedTasks = [...tasks, task];
      this.saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  }

  updateTask(updateTask: Task) {
    this.tasksSignal.update(tasks => {
      const updatedTasks = tasks.map(task =>
        task.id === updateTask.id ? updateTask : task
      );
      this.saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  }

  deleteTask(taskId: number) {
    this.tasksSignal.update(tasks => {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      this.saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  }

  toggleTaskCompletion(taskId: number) {
    this.tasksSignal.update(tasks => {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      this.saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  }

  editTask(taskId: number, updates: Partial<Task>) {
    this.tasksSignal.update(tasks => {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      );
      this.saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  }

  private saveTasksToLocalStorage(tasks: Task[]) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  private loadTasksFromLocalStorage(): Task[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const tasks = localStorage.getItem('tasks');
      return tasks ? JSON.parse(tasks) : [];
    }
    return [];
  }
}
