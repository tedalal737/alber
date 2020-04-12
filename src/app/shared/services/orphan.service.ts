import { Injectable } from '@angular/core';
import { Orphan, Adopter, Org, Adoption, User, Total, Message } from '../../shared/models'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth-service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap, catchError, map, switchMap, switchAll, switchMapTo, mergeMap } from 'rxjs/operators';
import { Observable, throwError, combineLatest, BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as firebase from 'firebase'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrphanService {

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  // go to next resulsts page
  goNextPage(value: string) {
    this.nextPage$.next(value);
  }

  // go to previous resulsts page
  goPrevPage(value: string) {
    this.prevPage$.next(value);
  }

  firstName$: BehaviorSubject<string | null>;
  secondName$: BehaviorSubject<string | null>;
  thirdName$: BehaviorSubject<string | null>;
  adopted$: BehaviorSubject<boolean | null>;
  nextPage$: BehaviorSubject<boolean | string>;
  prevPage$: BehaviorSubject<boolean | string>;

  // get all orphans
  getOrphans({ orgId, sex, pageSize = 10 }: { orgId: string, sex: string, pageSize?: number }): Observable<Orphan[]> {
    return combineLatest(
      this.adopted$, this.getAdopters(), this.nextPage$, this.prevPage$, this.firstName$, this.secondName$, this.thirdName$
    ).pipe(
      switchMap(([adopted, adopters, nextPage, prevPage, firstName, secondName, thirdName]) =>

        this.afs.collection<Orphan>('orphans', ref => {
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref.where('orgId', '==', orgId).where('sex', '==', sex); // default

          if (firstName && secondName) { query = query.where('firstName', '==', firstName).where('secondName', '==', secondName) }; // search
          if (thirdName) { query = query.where('thirdName', '==', thirdName) }; // search
          if (adopted == true) { query = query.where('adopted', '==', true) }; // adopted filter
          if (adopted == false) { query = query.where('adopted', '==', false) }; // adopted filter

          if (nextPage) return query.orderBy('idNo').limit(pageSize).startAfter(nextPage); // show next results
          else if (prevPage) return query.orderBy('idNo').limitToLast(pageSize).endBefore(prevPage); // show previous results
          else return query.orderBy('idNo').limit(pageSize)

        }).valueChanges().pipe(
          map(orphans => {
            orphans.map(
              o => {
                o.fullName = o.firstName + ' ' + o.secondName + ' ' + o.thirdName + ' ' + o.title
                o.staredName = o.firstName + ' ' + o.secondName + ' ' + o.thirdName + ' ' + "****"
                o.staredIdNo = o.idNo.substr(o.idNo.length - 6) + "****";
                if (o.adopted == true) {
                  o.adopter = adopters.find(a => o.adoption.adopterId === a.id)
                }
              }
            )
            return orphans
          }),
          // tap(data => console.log('orphans: ' + JSON.stringify(data))),
          catchError(this.handleError)
        )
      )
    );

  }

  // get orphan
  getOrphan(id: string): Observable<Orphan> {
    return this.afs.doc<Orphan>(`orphans/${id}`).valueChanges()
      .pipe(
        catchError(this.handleError)
      )
  }

  // get orphan with adopter
  getOrpahnWithAdopter(id: string): Observable<Orphan> {
    return this.getOrphan(id).pipe(
      mergeMap(orphan => {
        return this.getAdopter(orphan.adopterId).pipe(
          map(adopter => {
            orphan.adopter = adopter;
            return orphan
          })
        )
      })
    )
  }

  private user: Observable<User>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private location: Location,
    private http: HttpClient,
  ) {

    this.firstName$ = new BehaviorSubject(null);
    this.secondName$ = new BehaviorSubject(null);
    this.thirdName$ = new BehaviorSubject(null);
    this.adopted$ = new BehaviorSubject(null);
    this.nextPage$ = new BehaviorSubject(null);
    this.prevPage$ = new BehaviorSubject(null);

    this.user = this.authService.user$;


    // this.afs.collection<Orphan>('orphans').valueChanges().subscribe(orphans => {
    //   orphans.forEach(orphan => {
    //     if(orphan.adopted != true){
    //       setTimeout(
    //         () => {
    //           this.afs.doc(`orphans/${orphan.id}`).update({
    //             adopted: false
    //           });
    //         },
    //         5000
    //       );
    //     }
    //   })
    // });

    // this.afs.collection("orphans").get().subscribe(function (querySnapshot) {
    //   querySnapshot.forEach(function (doc) {
    //     var cityRef = this.afs.collection("orphans").doc(doc.id);

    //     return cityRef.update({
    //       adopted: false
    //     });
    //   });
    // });



  }


  // get org
  getOrg(): Observable<Org> {
    return this.user.pipe(
      switchMap(user => {
        return this.afs.doc<Org>(`orgs/${user.orgId}`).valueChanges().pipe(
          // tap(data => console.log('org: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
      })
    )
  }

  // get adopted orhans total
  getTotalAdoptedOrpahns(orgId: string) {
    return this.afs.doc<Total>(`totals/adoptions`).valueChanges().pipe(
      // tap(data => console.log('total: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


  getTotalOfOrphans(): Observable<Total> {
    return this.user.pipe(
      switchMap(user => {
        return this.afs.doc<Total>(`totals/${user.orgId}`).valueChanges()
          .pipe(
            // tap(data => console.log('total: ' + JSON.stringify(data))),
            catchError(this.handleError)
          )
      })
    )
  }

  // get total oraphns
  getTotalOrphans(orgId: string): Observable<Total> {
    return this.afs.doc<Total>(`totals/${orgId}`).valueChanges().pipe(
      // tap(data => console.log('total: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );


    // return this.user.pipe(x
    //   switchMap(user => {
    //     this.afs.doc(`totals/${user.orgId}`).valueChanges().pipe(
    //       // tap(data => console.log('orphans: ' + JSON.stringify(data))),
    //       catchError(this.handleError)
    //     );
    //     return of(null);
    //   })
    // )
    // this.user.subscribe(user=>{
    //   this.afs.doc<Orphan>(`totals/${user.orgId}`)
    // })
  }

  // get all adopters
  getAdopters(): Observable<Adopter[]> {
    return this.afs.collection<Adopter>('adopters').valueChanges()
      .pipe(
        // tap(data => console.log('All Complaints: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // get adopter
  getAdopter(id: string): Observable<Adopter> {
    return this.afs.doc<Adopter>(`adopters/${id}`).valueChanges()
      .pipe(
        catchError(this.handleError)
      )
  }

  // add adopter
  addAdopter(adopter: Adopter): void {
    this.afs.collection<Adopter>('adopters').add(adopter)
      .then(doc => {
        this.afs.doc(`adopters/${doc.id}`).update({
          'id' : doc.id
        })
      }).then(data => {
        this.afs.doc('totals/adopters').update({
          'total': firebase.firestore.FieldValue.increment(1)
        }).then(data => {
          this.router.navigate(['adopters-list']);
        });
      });
  }


  // url for send message when new adoption created
  newAdoptionUrl = `https://us-central1-alber-47b04.cloudfunctions.net/api/adoption-message`;

  // add adoption
  addAdoption(submitType: string, expireDate: Date, adopterId: string, orphanId: string, duration: number): void {
    this.afs.doc<Orphan>(`orphans/${orphanId}`).update({
      adopted: true,
      adoption: {
        expireDate: expireDate,
        adopterId: adopterId,
        duration: duration
      }
    }).then(data => {
      if (submitType == 'new') {
        this.user.subscribe(user => {
          this.afs.doc('totals/adoptions').update({
            [user.orgId]: firebase.firestore.FieldValue.increment(1)
          }).then(data => {
            this.location.back();
          });
        });
      } else {
        this.location.back();
      }
    }).then(data => {
      this.http.post(
        this.newAdoptionUrl,
        { phone: '0552931748' },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
          , responseType: 'text'
        }
      ).subscribe((data) => {
        // document.getElementById("openModal").click();
        // this.spinner.hide();
      });

    }).then(data => {
      alert('message sent')
    });
  }

  // delete adoption
  delteAdoption(id: string) {
    this.afs.doc(`orphans/${id}`).update({
      'adopted': false,
    }).then(data => {
      this.user.subscribe(user => {
        this.afs.doc('totals/adoptions').update({
          [user.orgId]: firebase.firestore.FieldValue.increment(-1)
        });
      })
    });
  }



  // get addopion message
  getAddoptionMessage() {
    return this.afs.doc<Message>('messages/adoption-message').valueChanges();
  }


  // adoption message
  updateAdoptionMessage(message: string) {
    this.afs.doc('messages/adoption-message').update({
      'message': message
    }).then(data => {
      this.router.navigate(['orphans-list/male']);
    });
  }




}
