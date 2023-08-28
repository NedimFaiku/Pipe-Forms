import { Component } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { Login } from '../Interfaces/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUser!: Login | null;
  constructor(private loginService: LoginService, private router: Router){
    this.loginService.user.subscribe(res =>{
      this.currentUser = res
    })
  }

  logout(){
    this.loginService.logOut();
    this.router.navigate(['login']);
  }
}
