import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  imports: [
    FontAwesomeModule,
    ButtonModule,
    FormsModule,
    CheckboxModule,
    InputTextModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  faGoogle = faGoogle;

  toastrService = inject(ToastrService);

  constructor(private router: Router, private authService: AuthService) {}

  handleSignInWithGoogle() {
    this.authService.signInWithGoogle().then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);

      const user = result.user;

      this.authService.addUserData(user, null);
      this.authService.setCurrentUser(user);
      this.router.navigateByUrl('');
    });
  }
}
