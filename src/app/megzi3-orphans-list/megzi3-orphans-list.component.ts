import { Component, OnInit } from '@angular/core';
import { Orphan } from '../shared/models';
import { Observable } from 'rxjs';
import { OrphanService } from '../shared/services/orphan.service';
import { AuthService } from '../shared/services/auth-service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-megzi3-orphans-list',
  templateUrl: './megzi3-orphans-list.component.html',
  styleUrls: ['./megzi3-orphans-list.component.css']
})
export class Megzi3OrphansListComponent implements OnInit {

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
    this.orphans$ = this.orphanService.getOrphans({ orgId: "raCkL5VyR5KOP8RJVPf7", sex: this.sex })
    this.dataSource$ = this.orphanService.getOrphans({ orgId: "raCkL5VyR5KOP8RJVPf7", sex: this.sex })


    if (this.route.snapshot.data['adopted'] == true) {
      this.orphanService.getTotalAdoptedOrpahns("raCkL5VyR5KOP8RJVPf7").subscribe(total => {
        this.total = total.raCkL5VyR5KOP8RJVPf7;
        console.log(this.total)
      });
    }else{

      this.orphanService.getTotalOrphans("raCkL5VyR5KOP8RJVPf7").subscribe(total => {
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
