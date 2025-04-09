import { Component } from '@angular/core';
import { DieComponent } from '../die/die.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dice-tray',
  imports: [DieComponent, CommonModule],
  templateUrl: './dice-tray.component.html',
  styleUrl: './dice-tray.component.scss',
})
export class DiceTrayComponent {
  isOpen = false;
  lastRoll: { sides: number; result: number } | null = null;

  toggleTray() {
    this.isOpen = !this.isOpen;
  }

  handleRoll(sides: number, result: number) {
    this.lastRoll = { sides, result };
  }
}
