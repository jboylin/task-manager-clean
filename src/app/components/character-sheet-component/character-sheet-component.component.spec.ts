import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSheetComponentComponent } from './character-sheet-component.component';

describe('CharacterSheetComponentComponent', () => {
  let component: CharacterSheetComponentComponent;
  let fixture: ComponentFixture<CharacterSheetComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSheetComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterSheetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
