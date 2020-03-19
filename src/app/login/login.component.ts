import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  NgxSpinnerService} from "ngx-spinner";
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../shared/services/auth-service/auth.service';
import {Router} from "@angular/router"
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.formGroup = this.fb.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
    });
  }

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }

  onSubmit() {

    if (this.formGroup.valid) {
      this.spinner.show();
      this.authService.login(this.email.value, this.password.value).then((user)=>{
        if(user){
          this.spinner.hide();
          this.router.navigate(['orphans-list/male']);
        }
      }).catch(error=>{
        this.spinner.hide();
        this.toastr.error('البريد الالكتروني او كلمة المرور غير صحيحة');
      });
    }
  }

  ngOnInit(): void {
  }

}
