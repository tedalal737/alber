import { Component, OnInit } from '@angular/core';
import { Orphan, Org } from '../shared/models';
import { Observable } from 'rxjs';
import { OrphanService } from '../shared/services/orphan.service';
import { AuthService } from '../shared/services/auth-service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-orphans-list',
  templateUrl: './orphans-list.component.html',
  styleUrls: ['./orphans-list.component.css']
})
export class OrphansListComponent implements OnInit {

  sex: string = this.route.snapshot.data['sex'];
  formGroup: FormGroup;
  navigation: boolean = true;

  // displayedColumns: string[] = ['#', 'fullName', 'idNo', 'adopterName'];  

  org$: Observable<Org> = this.orphanService.getOrg();
  orphans$: Observable<Orphan[]>;
  dataSource$: Observable<Orphan[]>;
  total: number;
  nextCount = 0;
  itemIndex = 0;

  arrayOne(n: number): any[] {
    return Array(n);
  }

  constructor(
    private orphanService: OrphanService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.formGroup = this.fb.group({
      'firstName': ['', [Validators.required]],
      'secondName': ['', [Validators.required]],
    });
  }

  get firstName() {
    return this.formGroup.get('firstName');
  }

  get secondName() {
    return this.formGroup.get('secondName');
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.orphanService.firstName$.next(this.firstName.value);
      this.orphanService.secondName$.next(this.secondName.value);
    }
    this.navigation = false;
  }

  cancelSearch() {
    this.orphanService.firstName$.next(null);
    this.orphanService.secondName$.next(null);
    this.navigation = true;
    this.firstName.setValue('');
    this.secondName.setValue('');
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
    this.nextCount += 1;
    this.orphanService.goNextPage(value)
  }

  goPrevPage(value: string) {
    console.log(value)
    this.nextCount -= 1;
    this.orphanService.goNextPage(null)
    this.orphanService.goPrevPage(value)
  }

  delteAdoption(id: string) {
    this.orphanService.delteAdoption(id);
  }

  getItemIndex() {
    if (this.itemIndex == 10) return false
    return this.itemIndex += 1;
  }

  logout() {
    this.authService.logout();
  }

  search() {
    this.orphanService.firstName$.next('احمد');
    this.orphanService.secondName$.next('حافظ');
  }

}
