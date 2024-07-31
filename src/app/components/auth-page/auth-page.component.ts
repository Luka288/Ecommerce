import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export default  class AuthPageComponent {

}
