import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

export const routes: Routes = [
    { path: 'todo-list', component: TodoListComponent },
    { path: 'todo-form', component:  TaskFormComponent },
    
];
