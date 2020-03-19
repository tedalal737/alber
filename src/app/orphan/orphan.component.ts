import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AngularFirestore } from '@angular/fire/firestore';
import { Orphan, Org, User, Total } from 'src/app/shared/models';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router"
import { AuthService } from '../shared/services/auth-service/auth.service';
import { Observable } from 'rxjs';
import { OrphanService } from '../shared/services/orphan.service';

@Component({
  selector: 'app-orphan',
  templateUrl: './orphan.component.html',
  styleUrls: ['./orphan.component.css']
})
export class OrphanComponent implements OnInit {

  formGroup: FormGroup;
  routeParams: Params;
  sex: string;
  org$: Observable<Org> = this.orphanService.getOrg();
  totalOrphans$: Observable<Total> = this.orphanService.getTotalOfOrphans();

  // if edit orphan
  orphanId: string;
  orphan: Orphan;
  private user: Observable<User>;

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService,
    private orphanService: OrphanService,
  ) {


    this.user = this.authService.user$;

    this.routeParams = route.snapshot.params;
    this.sex = this.route.snapshot.data['sex'];

    // this.authService.getOrg().subscribe(org => {
    //   this.org = org;
    //   this.getOrphans();
    // });


    if (this.routeParams['orphanId']) {
      this.orphanId = this.routeParams['orphanId']
      this.afs.doc<Orphan>(`orphans/${this.orphanId}`).valueChanges()
        .subscribe(orphan => {
          this.orphan = orphan;
          this.firstName.setValue(this.orphan.firstName)
          this.secondName.setValue(this.orphan.secondName)
          this.thirdName.setValue(this.orphan.thirdName)
          this.title.setValue(this.orphan.title)
          this.idNo.setValue(this.orphan.idNo)
        });
    }


    this.formGroup = this.fb.group({
      'firstName': ['', [Validators.required]],
      'secondName': ['', [Validators.required]],
      'thirdName': [''],
      'title': ['', [Validators.required]],
      'idNo': ['', [Validators.required]],
    });
  }

  get firstName() {
    return this.formGroup.get('firstName');
  }

  get secondName() {
    return this.formGroup.get('secondName');
  }

  get thirdName() {
    return this.formGroup.get('thirdName');
  }

  get title() {
    return this.formGroup.get('title');
  }

  get idNo() {
    return this.formGroup.get('idNo');
  }

  async onSubmit() {


    if (this.orphanId) {
      this.spinner.show();
      await this.afs.doc<Orphan>(`orphans/${this.orphanId}`).update({
        'firstName': this.firstName.value,
        'secondName': this.secondName.value,
        'thirdName': this.thirdName.value,
        'title': this.title.value,
        'idNo': this.idNo.value,
      });
      this.toastr.success('تم تعديل بيانات اليتيم بنجاح');
      // this.formGroup.reset();
      this.spinner.hide();


    } else {

      if (this.formGroup.valid && !this.orphanId) {
        this.spinner.show();
        this.afs.collection<Orphan>('orphans', ref => ref.where('idNo', '==', this.idNo.value)).get()
          .subscribe(async (data) => {
            if (data.docs.length > 0) {
              this.toastr.error('اليتيم مسجل سابقاً');
              this.spinner.hide();
            } else {
              this.user.subscribe(user => {
                this.afs.collection('orphans').add({
                  'firstName': this.firstName.value,
                  'secondName': this.secondName.value,
                  'thirdName': this.thirdName.value,
                  'title': this.title.value,
                  'idNo': this.idNo.value,
                  'sex': this.sex,
                  'orgId': user.orgId,
                }).then(newDoc => {
                  this.afs.doc(`orphans/${newDoc.id}`).update({
                    'id': newDoc.id
                  });
                  this.toastr.success('تم تسجيل بيانات اليتيم بنجاح');
                  // this.getOrphans();
                  // this.formGroup.reset();
                  this.spinner.hide();
                });
              });
            }
          });

      }

    }


  }

  logout(){
    this.authService.logout();
  }

  ngOnInit(): void {
  }

}
