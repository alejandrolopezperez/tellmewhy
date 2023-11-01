import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public get isAuth(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout().subscribe();
  }
}
