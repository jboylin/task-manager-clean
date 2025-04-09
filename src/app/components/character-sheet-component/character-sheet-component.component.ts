import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character, StatKey } from '../../models/character.model';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-character-sheet-component',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './character-sheet-component.component.html',
  styleUrl: './character-sheet-component.component.scss',
})
export class CharacterSheetComponentComponent {
  @Input() character!: Character;
  @Output() update = new EventEmitter<Partial<Character>>();

  onFieldChange() {
    this.update.emit({ ...this.character }); // ✅ emits the whole updated character
  }
  statKeys(): StatKey[] {
    return ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  }
}
