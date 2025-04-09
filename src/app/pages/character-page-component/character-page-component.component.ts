import { Component, OnInit } from '@angular/core';
import { CharacterSheetComponentComponent } from '../../components/character-sheet-component/character-sheet-component.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Character } from '../../models/character.model';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-page-component',
  imports: [CharacterSheetComponentComponent, RouterModule, CommonModule],
  templateUrl: './character-page-component.component.html',
  styleUrl: './character-page-component.component.scss',
})
export class CharacterPageComponent implements OnInit {
  characters: Character[] = [];

  constructor(private characterService: CharacterService) {}

  async ngOnInit() {
    const charStream = await this.characterService.getCharacters();
    charStream.subscribe((chars) => {
      this.characters = chars;
    });
  }

  addCharacter() {
    const newChar: Character = {
      name: 'Unnamed Hero',
      class: '',
      stats: {
        str: 10,
        dex: 10,
        con: 10,
        int: 10,
        wis: 10,
        cha: 10,
      },
    };

    this.characterService.addCharacter(newChar);
  }

  updateCharacter(id: string, update: Partial<Character>) {
    this.characterService.updateCharacter(id, update);
  }

  deleteCharacter(id: string) {
    this.characterService.deleteCharacter(id);
  }
}
