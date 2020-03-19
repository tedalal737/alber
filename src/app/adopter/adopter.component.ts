import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Adopter } from '../shared/models';
import { OrphanService } from '../shared/services/orphan.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adopter',
  templateUrl: './adopter.component.html',
  styleUrls: ['./adopter.component.css']
})
export class AdopterComponent implements OnInit {

  formGroup: FormGroup;
  adopter: Adopter;
  adopterId: string;

  constructor(
    private fb: FormBuilder,
    private orphanService: OrphanService,
    private route: ActivatedRoute,
  ) {
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

    if(this.formGroup.valid){

      const adotper: Adopter = this.formGroup.value;

      this.orphanService.addAdopter(adotper);

    }

  }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get("adopterId")){
      this.adopterId = this.route.snapshot.paramMap.get("orphanId");
    }
  }

}
