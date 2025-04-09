import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-die',
  imports: [CommonModule],
  templateUrl: './die.component.html',
  styleUrl: './die.component.scss',
})
export class DieComponent {
  @Input() sides = 6;
  @Output() roll = new EventEmitter<number>();

  currentValue = 1;

  isRolling = false;

  rollDie() {
    if (this.isRolling) return; // prevent spamming animation

    const result = Math.floor(Math.random() * this.sides) + 1;
    this.currentValue = result;
    this.roll.emit(result);

    this.isRolling = true;
    setTimeout(() => (this.isRolling = false), 600); // Match animation duration
  }
}
