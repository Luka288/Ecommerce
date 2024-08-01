import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthInterface } from '../../shared/interface/auth';
import { MatInputModule } from '@angular/material/input';
import { UserAvatar } from '../../shared';
import { MatTabsModule } from '@angular/material/tabs';
import { catchError, empty, EMPTY, tap } from 'rxjs';
import { SweetAlertService } from '../../shared/services/sweet-alert.service';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [MatTabsModule, CommonModule, RouterLink, RouterModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export default  class AuthPageComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder)
  private readonly alerts = inject(SweetAlertService)
  private readonly route = inject(Router)



    private readonly userAvatar = UserAvatar;

    tabIndex = 0;

   readonly signUpForm = this.fb.group({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(16)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(16),
    ]),
    email: new FormControl('lukagaxokidze28@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('niniko787', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    age: new FormControl(18, [
      Validators.required,
      Validators.min(10),
      Validators.max(150),
    ]),
    zipcode: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(16),
    ]),
    gender: new FormControl('MALE', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(2)]),
  })

  register(){
    const user = this.signUpForm.value as AuthInterface;
    user.avatar = `${this.userAvatar}${user.firstName}`
    this.tabIndex = 1;

    if(!user._id){
      this.alerts.toast("Wrong", 'error', 'no');
      return
    }

    this.authService.register(user).pipe(tap(user => {
      if(user._id){
        this.alerts.alert('success', 'success', 'success')
        this.tabIndex = 0;
        // this.verifyAsUser(user.email)
      }
      this.signUpForm.reset()
      console.log(user)
    })).subscribe()
    



  }
 
  login(){
    const email = this.signUpForm.value.email 
    const password = this.signUpForm.value.password

    if(!email || !password){
      this.alerts.toast('Check password or email', 'error', 'Check if password or email is correct')
      return
    }
    this.authService.logIn(email, password).pipe(
      tap(token => {
        this.alerts.toast('Signed In', 'success', 'You are signed in')
        this.route.navigateByUrl('')
      }),
      catchError((err) => {
        this.alerts.toast('Check password or email', 'error', 'Check if password or email is correct')
        return EMPTY;
      }),
    ).subscribe()
  }

  verifyAsUser(email: string){
    this.authService.verifyEmail(email).subscribe((res) => {
      this.alerts.alert('Check your email to verify as user', 'warning', 'Check email and make sure that you are verifyed to make purchases')
      console.log('sending verify ')
      console.log(res)
    })
  }
}
