import { Component, OnInit } from '@angular/core';
import { Orphan } from '../shared/models';
import { Observable } from 'rxjs';
import { OrphanService } from '../shared/services/orphan.service';
import { AuthService } from '../shared/services/auth-service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-marwa-orphans-list',
  templateUrl: './marwa-orphans-list.component.html',
  styleUrls: ['./marwa-orphans-list.component.css']
})
export class MarwaOrphansListComponent implements OnInit {

  sex: string = this.route.snapshot.data['sex'];
  adopted: boolean = this.route.snapshot.data['adopted'];
  total: number;
  nextCount = 1;
  itemIndex = 0;

  // displayedColumns: string[] = ['#', 'fullName', 'idNo', 'adopterName'];  

  orphans$: Observable<Orphan[]>;
  dataSource$: Observable<Orphan[]>;


  constructor(
    private orphanService: OrphanService,
    private autService: AuthService,
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) {
  }

  ngOnInit(): void {
    this.orphanService.adopted$.next(this.adopted);
    this.orphans$ = this.orphanService.getOrphans({ orgId: "zCQ3Dhxv5dQza3qKxhrV", sex: this.sex })
    this.dataSource$ = this.orphanService.getOrphans({ orgId: "zCQ3Dhxv5dQza3qKxhrV", sex: this.sex })


    if (this.route.snapshot.data['adopted'] == true) {
      this.orphanService.getTotalAdoptedOrpahns("zCQ3Dhxv5dQza3qKxhrV").subscribe(total => {
        this.total = total.zCQ3Dhxv5dQza3qKxhrV;
        console.log(this.total)
      });
    }else{

      this.orphanService.getTotalOrphans("zCQ3Dhxv5dQza3qKxhrV").subscribe(total => {
        this.total = total[this.sex];
        console.log(this.total)
      });
  
    }

  }

  goNextPage(value: string) {
    this.nextCount += 1;
    this.orphanService.goNextPage(value)
  }

  goPrevPage(value: string) {
    console.log(value)
    this.nextCount -= 1;
    this.orphanService.goNextPage(null)
    this.orphanService.goPrevPage(value)
  }


  // update(id) {
  //   this.afs.doc(`orphans/${id}`).update({
  //     adopted: false
  //   })
  // }

}
