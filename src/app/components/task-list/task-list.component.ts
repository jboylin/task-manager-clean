import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle = '';
  user: User | null = null;

  constructor(private taskService: TaskService, private auth: AuthService) {}

  animatedPlaceholder = '';
  private fullPlaceholder = 'What tasks lie ahead?';

  ngOnInit(): void {
    this.animatePlaceholder();
    this.auth.user$.subscribe((user) => (this.user = user));

    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks.sort((a, b) => b.createdAt - a.createdAt);
    });
  }

  login() {
    this.auth.loginWithGoogle();
  }

  logout() {
    this.auth.logout();
  }

  animatePlaceholder() {
    let i = 0;
    const interval = setInterval(() => {
      this.animatedPlaceholder = this.fullPlaceholder.slice(0, i + 1);
      i++;
      if (i === this.fullPlaceholder.length) clearInterval(interval);
    }, 75);
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;

    const task: Task = {
      title: this.newTaskTitle.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    this.taskService.addTask(task).then(() => {
      this.newTaskTitle = '';
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id);
  }

  justCompletedTaskId: string | null = null;

  toggleCompletion(task: Task): void {
    const justNowCompleted = !task.completed;
    this.taskService.toggleTaskCompletion(task.id!, justNowCompleted);

    if (justNowCompleted) {
      this.justCompletedTaskId = task.id!;
      setTimeout(() => {
        if (this.justCompletedTaskId === task.id) {
          this.justCompletedTaskId = null;
        }
      }, 1500);
    }
  }

  darkMode = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
  }
}
