import { Component, OnInit } from '@angular/core';
import { Orphan, Org } from '../shared/models';
import { Observable } from 'rxjs';
import { OrphanService } from '../shared/services/orphan.service';
import { AuthService } from '../shared/services/auth-service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orphans-list',
  templateUrl: './orphans-list.component.html',
  styleUrls: ['./orphans-list.component.css']
})
export class OrphansListComponent implements OnInit {

  sex: string = this.route.snapshot.data['sex'];

  // displayedColumns: string[] = ['#', 'fullName', 'idNo', 'adopterName'];  

  org$: Observable<Org> = this.orphanService.getOrg();
  orphans$: Observable<Orphan[]>;
  dataSource$: Observable<Orphan[]>;
  total: number;
  nextCount = 1;
  itemIndex = 0;

  arrayOne(n: number): any[] {
    return Array(n);
  }

  constructor(
    private orphanService: OrphanService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.orphans$ = this.orphanService.getOrphans({ orgId: user.orgId, sex: this.sex })
      this.dataSource$ = this.orphanService.getOrphans({ orgId: user.orgId, sex: this.sex })
      this.orphanService.getTotalOrphans(user.orgId).subscribe(total => {
        this.total = total[this.sex]
      });
    })
  }

  goNextPage(value: string) {
    this.nextCount+=1;
    this.orphanService.goNextPage(value)
  }

  goPrevPage(value: string) {
    console.log(value)
    this.nextCount-=1;
    this.orphanService.goNextPage(null)
    this.orphanService.goPrevPage(value)
  }

  delteAdoption(id: string) {
    this.orphanService.delteAdoption(id);
  }

  getItemIndex(){
    if(this.itemIndex == 10) return false
    return this.itemIndex+=1;
  }

  logout(){
    this.authService.logout();
  }

}
