import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    AuthService
  ]
})
export class AppComponent {
  /**
   * @param {Router} router
   * @param {AuthService} authService
   */
  public constructor(private router: Router, private authService: AuthService) {
    this.router.events
      .filter((event: any) => event instanceof NavigationStart)
      .subscribe(
        (event: NavigationStart) => {
          const logged: boolean = this.authService.userIsAuthed();

          if (!logged && event.url !== '/auth') {
            this.router.navigate(['auth']);
          }
        }
      );

    // this.router.navigate(['home']);
  }
}
