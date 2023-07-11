import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errors: string[] | null = null;
  complexPassword = "(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$"

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router){}
  
  registerForm = this.fb.group({
    displayName: ['', Validators.required]
    ,email:['', [Validators.required, Validators.email]]
    ,password:['', [Validators.required, Validators.pattern(this.complexPassword)]]
  })

  onSubmit()
  {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/shop'),
      error: error =>  this.errors = error.errors
    })
  }
}
