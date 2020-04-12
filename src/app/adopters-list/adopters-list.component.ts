import { Component, OnInit } from '@angular/core';
import { Adopter } from '../shared/models';
import { Observable } from 'rxjs';
import { OrphanService } from '../shared/services/orphan.service';
import { AuthService } from '../shared/services/auth-service/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-adopters-list',
  templateUrl: './adopters-list.component.html',
  styleUrls: ['./adopters-list.component.css']
})
export class AdoptersListComponent implements OnInit {

  dataSource$: Observable<Adopter[]> = this.orphanService.getAdopters();

  constructor(
    private orphanService: OrphanService,
    private autService: AuthService,
    private afs: AngularFirestore
  ) { }


  deleteAdopter(id){
    this.afs.doc(`adopters/${id}`).delete();
  }

  ngOnInit(): void {
  }

}
