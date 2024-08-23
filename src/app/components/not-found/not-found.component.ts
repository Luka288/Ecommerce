import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export default class NotFoundComponent implements OnInit {
  private readonly route = inject(Router)
  private readonly ref = inject(ChangeDetectorRef)
  
  counter: number = 5;

  ngOnInit(): void {
    this.backToHome()
  }

  backToHome(){ 
    const interval = setInterval(() => {
        this.counter--;
        if(this.counter === 0){
          clearInterval(interval);
          this.route.navigateByUrl('/')
        }
    }, 1000);
  }
}
