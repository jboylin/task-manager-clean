import { Component } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { DiceTrayComponent } from '../../components/dice-tray/dice-tray.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [TaskListComponent, DiceTrayComponent, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
