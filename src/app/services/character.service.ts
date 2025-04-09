import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

import { Auth, authState } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

import { Observable } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  private async getUserId(): Promise<string> {
    const user = await firstValueFrom(authState(this.auth));
    if (!user) throw new Error('User not logged in');
    return user.uid;
  }

  async getCharacters(): Promise<Observable<Character[]>> {
    const uid = await this.getUserId();
    const ref = collection(this.firestore, `users/${uid}/characters`);
    return collectionData(ref, { idField: 'id' }) as Observable<Character[]>;
  }

  async addCharacter(character: Character) {
    const uid = await this.getUserId();
    const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const docRef = doc(this.firestore, `users/${uid}/characters/${id}`);
    await setDoc(docRef, character);
  }

  async updateCharacter(id: string, data: Partial<Character>) {
    const uid = await this.getUserId();
    const docRef = doc(this.firestore, `users/${uid}/characters/${id}`);
    await updateDoc(docRef, data);
  }

  async deleteCharacter(id: string) {
    const uid = await this.getUserId();
    const docRef = doc(this.firestore, `users/${uid}/characters/${id}`);
    await deleteDoc(docRef);
  }
}
