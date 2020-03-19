import { Component, OnInit } from '@angular/core';
import { OrphanService } from '../shared/services/orphan.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-adoption-message',
  templateUrl: './adoption-message.component.html',
  styleUrls: ['./adoption-message.component.css']
})
export class AdoptionMessageComponent implements OnInit {

  addoptionMessage: string;
  formGroup: FormGroup;

  constructor(
    private orphanService: OrphanService,
    private fb: FormBuilder,
  ) { 
    this.formGroup = this.fb.group({
      'message': ['', [Validators.required]],
    });

  }

  get message() {
    return this.formGroup.get('message');
  }



  onSubmit(){
    this.orphanService.updateAdoptionMessage(this.message.value);
  }

  ngOnInit(): void {
    // this.orphanService.getAddoptionMessage().subscribe(data=>{
    //   // this.addoptionMessage = data.addptionMessage;
    //   this.message.setValue(data.message)
    //   console.log(data)
    // });
  }

}
