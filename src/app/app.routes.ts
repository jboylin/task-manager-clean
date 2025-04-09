import { Routes } from '@angular/router';
import { CharacterPageComponent } from './pages/character-page-component/character-page-component.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'characters', component: CharacterPageComponent },
];
