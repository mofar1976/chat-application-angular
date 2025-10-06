import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../../shared/shared.module';
import { AuthService } from '../../../services/auth/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/auth/auth.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  faGoogle = faGoogle;

  toastrService = inject(ToastrService);

  form: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;
    this.store.dispatch(AuthActions.login({ email, password }));
  }

  handleSignInWithGoogle() {
    this.authService.signInWithGoogle().then((result) => {
      const user = result.user;

      this.authService.addUserData(user, null);
      this.authService.setCurrentUser(user);
      this.router.navigateByUrl('');
    });
  }
}
