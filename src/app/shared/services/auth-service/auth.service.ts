import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User, Orphan, Org } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  user: any;
  totalOrphans: number;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    ) {

    this.user$ = this.afAuth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            this.afs.doc(`users/${user.uid}`).snapshotChanges().subscribe(
              user => {
                this.user = user.payload.data();
              }
            );
            return this.afs.doc(`users/${user.uid}`).valueChanges();
          } else {
            return of(null)
          }
        })
      );
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.router.navigate(['']);
    this.afAuth.auth.signOut();
  }

  getOrg() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        return this.afs.doc<User>(`users/${user.uid}`).snapshotChanges().pipe(
          switchMap(userDoc => {
            const orgId: string = userDoc.payload.get('orgId');
            return this.afs.doc<Org>(`orgs/${orgId}`).valueChanges()
          })
        )
      })
    );
  }

  getOrphansTotal(orgId: string, sex: string) {
   return this.afs.collection<Orphan>('orphans', ref => ref.where('orgId', '==', orgId).where('sex', '==', sex)).get()
  }

}