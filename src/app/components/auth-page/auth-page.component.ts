import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthInterface } from '../../shared/interface/auth';
import { MatInputModule } from '@angular/material/input';
import { UserAvatar } from '../../shared';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export default  class AuthPageComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder)


  private readonly userAvatar = UserAvatar;

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
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
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
    this.authService.register(user).subscribe((res) => {
      console.log(res)
    })
  }
}
