import { Component, inject, OnInit } from '@angular/core';
import { UserInfoService } from '../../shared/services/user-info.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export default class ProfileComponent implements OnInit {
  private readonly userInfo = inject(UserInfoService)

  ngOnInit(): void {
    this.loadUser()
  }


  loadUser(): void{
    this.userInfo.getUser().pipe(tap(res => {
      console.log(res)
    })).subscribe()
  }

}
