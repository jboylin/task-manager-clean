import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';

import { Auth } from '@angular/fire/auth';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { switchMap, of } from 'rxjs';

import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  private getUserTaskCollection() {
    const currentUser = this.auth.currentUser;
    if (!currentUser) throw new Error('User not logged in');
    return collection(this.firestore, `users/${currentUser.uid}/tasks`);
  }

  getTasks(): Observable<Task[]> {
    return user(this.auth).pipe(
      switchMap((userData) => {
        if (!userData) return of([]);
        const tasksRef = collection(
          this.firestore,
          `users/${userData.uid}/tasks`
        );
        return collectionData(tasksRef, { idField: 'id' }) as Observable<
          Task[]
        >;
      })
    );
  }

  addTask(task: Task) {
    const tasksRef = this.getUserTaskCollection();
    return addDoc(tasksRef, task);
  }

  deleteTask(id: string) {
    const currentUser = this.auth.currentUser;
    if (!currentUser) throw new Error('User not logged in');
    const taskDoc = doc(this.firestore, `users/${currentUser.uid}/tasks/${id}`);
    return deleteDoc(taskDoc);
  }

  toggleTaskCompletion(id: string, completed: boolean) {
    const currentUser = this.auth.currentUser;
    if (!currentUser) throw new Error('User not logged in');
    const taskDoc = doc(this.firestore, `users/${currentUser.uid}/tasks/${id}`);
    return updateDoc(taskDoc, { completed });
  }
}
