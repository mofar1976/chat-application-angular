import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-register',
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  error: string | null = null;
  private store = inject(Store);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      displayName: [''],
    });
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password, displayName } = this.form.value;
    this.store.dispatch(AuthActions.register({ email, password, displayName }));
  }
}
