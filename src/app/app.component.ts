import { Component } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-task-form></app-task-form>
      <app-todo-list></app-todo-list>
    </div>
  `,
  standalone: true,
  imports: [ TaskFormComponent, TodoListComponent],
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
