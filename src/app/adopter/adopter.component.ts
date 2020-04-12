import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Adopter } from '../shared/models';
import { OrphanService } from '../shared/services/orphan.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-adopter',
  templateUrl: './adopter.component.html',
  styleUrls: ['./adopter.component.css']
})
export class AdopterComponent implements OnInit {

  formGroup: FormGroup;
  adopter: Adopter;
  adopterId: string;
  routeParams: Params;

  constructor(
    private fb: FormBuilder,
    private orphanService: OrphanService,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
  ) {

    this.routeParams = route.snapshot.params;


    if (this.routeParams['adopterId']) {
      this.adopterId = this.routeParams['adopterId'];

      this.afs.doc<Adopter>(`adopters/${this.adopterId}`).valueChanges()
        .subscribe(adopter => {
          this.adopter = adopter;
          this.name.setValue(this.adopter.name)
          this.mobile.setValue(this.adopter.mobile)
          this.city.setValue(this.adopter.city)
        });
    }


    this.formGroup = this.fb.group({
      'name': ['', [Validators.required]],
      'mobile': ['', [Validators.required]],
      'city': ['', [Validators.required]],
    });
  }

  get name() {
    return this.formGroup.get('name');
  }

  get mobile() {
    return this.formGroup.get('mobile');
  }

  get city() {
    return this.formGroup.get('city');
  }

  onSubmit() {



    if (this.routeParams['adopterId']) {

      this.afs.doc<Adopter>(`adopters/${this.routeParams['adopterId']}`).update({
        'name': this.name.value,
        'mobile': this.mobile.value,
        'city': this.city.value,
      });
      // this.formGroup.reset();

    } else {

      if (this.formGroup.valid) {

        const adotper: Adopter = this.formGroup.value;

        this.orphanService.addAdopter(adotper);

      }

    }
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get("adopterId")) {
      this.adopterId = this.route.snapshot.paramMap.get("orphanId");
    }
  }

}
