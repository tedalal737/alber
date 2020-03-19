import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Orphan, Adopter } from '../shared/models';
import { OrphanService } from '../shared/services/orphan.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css']
})
export class AdoptionComponent implements OnInit {

  orphanId: string;
  adopters: Adopter[];
  orphan: Orphan;
  submitType: string;

  formGroup: FormGroup;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orphanService: OrphanService
  ) { 
    this.formGroup = this.fb.group({
      'adopter': ['', [Validators.required]],
      'adoptionExpireDate': [[Validators.required]],
      'duration': ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.orphanService.getAdopters().subscribe(adopters=>{
      this.adopters = adopters;
    });

    this.orphanId = this.route.snapshot.paramMap.get("orphanId");

    this.orphanService.getOrpahnWithAdopter(this.orphanId).subscribe(orphan=>{
      this.orphan = orphan;

      this.submitType = this.orphan.adopted ? 'update' : 'new';


      if(this.orphan.adopted){

        this.adopter.setValue(this.orphan.adoption.adopterId);
        this.duration.setValue(this.orphan.adoption.duration);

        const timestamp = new Date((this.orphan.adoption.expireDate.seconds) * 1000);

        const day =  (String(timestamp.getDate()).padStart(2, '0')).toString()
        const month =  (String(timestamp.getMonth() + 1).padStart(2, '0')).toString()
        const year =  timestamp.getFullYear().toString()
        const date = `${year}-${month}-${day}T21:00:00.000`;
        this.adoptionExpireDate.setValue(date);

      }
    })

  }

  get adopter() {
    return this.formGroup.get('adopter');
  }

  get adoptionExpireDate() {
    return this.formGroup.get('adoptionExpireDate');
  }

  get duration() {
    return this.formGroup.get('duration');
  }

  
  onSubmit(){
    if(this.formGroup.valid){      
      this.orphanService.addAdoption(
        this.submitType,
        new Date(this.adoptionExpireDate.value),
        this.adopter.value, this.orphanId,
        this.duration.value
        );
    }
  }
}
