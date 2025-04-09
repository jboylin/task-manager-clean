import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterModule],
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'task-manager-clean';
}
