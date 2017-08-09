import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EntranceWindowType } from './auth-window-type.enum';
import { Router } from '@angular/router';
import { User } from '../../models/user/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../models/user/user.service';

// @todo remember page which user try to go and redirect to it after auth
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [
    AuthService,
    UserService
  ]
})
export class AuthComponent {
  public userForm: FormGroup;

  private validationTimeout: number;
  public windowIsRegistration: boolean = false;
  private windowType: EntranceWindowType;
  public formErrors: any = {
    name: [],
    email: [],
    password: [],
  };
  private validationMessages: Object = {
    '0': {

    },
    name: {
      'required': 'Заполните ник, пожалуйста.',
      'minlength': 'Ник должен быть не короче 3 символов.',
      'maxlength': 'Ник должен быть короче 255 символов.',
      'unique': 'Ник занят.'
    },
    email: {
      'required': 'Заполните email, пожалуйста.',
      'maxlength': 'Email должен быть короче 255 символов.',
      'pattern': 'Email невалидный.',
      'unique': 'Email занят.'
    },
    password: {
      'required': 'Заполните пароль, пожалуйста.',
      'minlength': 'Пароль должен быть не короче 5 символов.'
    },
  };

  /**
   * @param {FormBuilder} fb
   * @param {Router} router
   * @param {UserService} userService
   * @param {AuthService} authService
   */
  public constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.checkIsAuthed();

    this.windowType = EntranceWindowType.auth;
    this.userForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(24)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(
            /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i
          )
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ]
    });

    this.userForm.valueChanges
      .subscribe((data: any) => this.validateForm(true));

    this.validateForm(false);
  }

  /**
   * Checks auth and redirect to the home
   */
  private checkIsAuthed(): void {
    if (this.authService.userIsAuthed()) {
      this.router.navigate(['']);
    }
  }

  /**
   * Checks if form needs to be validated
   *
   * @param {boolean} typing - shows if user is still typing
   */
  private validateForm(typing: boolean = false): void {
    if (!this.userForm) {
      return;
    }

    if (typing) {
      clearTimeout(this.validationTimeout);

      this.validationTimeout = setTimeout(
        () => {
          this.validateForm(false);
        },
        500
      );

      return;
    }

    if (this.validationTimeout) {
      clearTimeout(this.validationTimeout);
    }

    this.checkErrors();
  }

  /**
   * Checks controls errors and creates an array of error messages
   */
  private checkErrors(): void {
    const form: FormGroup = this.userForm;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = [];
        const control: AbstractControl = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages: Object = this.validationMessages[field];

          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field].push(messages[key]);
            }
          }
        }
      }
    }
  }

  /**
   * Registers User or makes auth
   */
  public doSubmit(): void {
    const formValid: boolean = this.checkFormIsValid();

    if (!formValid) {
      return;
    }

    const user: User = new User(this.userForm.value);
    this.authUser(user);
  }

  /**
   * Authorizes user
   *
   * @param {User} user
   */
  private authUser(user: User): void {
    this.userService.authUser(user)
      .subscribe(
        (authedUser: User) => {
          this.authService.rememberUser(authedUser);
          this.checkIsAuthed();
        },
        this.parseBackendErrors
      );
  }

  /**
   * Registers user
   *
   * @param {User} user
   */
  private registerUser(user: User): void {
    this.userService.createUser(user)
      .subscribe(
        (newUser: User) => {
          this.authService.rememberUser(newUser);
        },
        this.parseBackendErrors
      );
  }

  /**
   * @param {any} errors
   */
  private parseBackendErrors(errors: any): void {
    const parsedErrors: Object = errors.json();

    for (const field in parsedErrors) {
      if (parsedErrors.hasOwnProperty(field)) {
        const messages: Object = this.validationMessages[field];
        this.formErrors[field] = [];

        for (const errorName of parsedErrors[field]) {
          this.formErrors[field].push(messages[errorName]);
        }
      }
    }

  }

  /**
   * @return {boolean}
   */
  private checkFormIsValid(): boolean {
    const form: FormGroup = this.userForm;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        const control: AbstractControl = form.get(field);

        if (control && !control.dirty) {
          control.markAsDirty();
        }
      }
    }

    if (this.windowType === EntranceWindowType.auth) {
      const control: AbstractControl = form.get('name');
      control.disable();
    }

    this.checkErrors();

    return this.userForm.valid;
  }

  /**
   * Returns a text  for the link
   *
   * @return {string}
   */
  private getAnotherWindowType(): string {
    return this.windowType === EntranceWindowType.auth ? 'Регистрация' : 'Авторизация';
  }

  /**
   * Returns a text for the button
   *
   * @return {string}
   */
  public getAnotherButtonMessage(): string {
    return this.windowType === EntranceWindowType.auth ? 'Войти' : 'Зарегистрироваться';
  }

  /**
   * Toggles a type of the window
   *
   * @param {MouseEvent} event
   */
  public changeWindowType(event: MouseEvent): void {
    event.preventDefault();

    this.windowIsRegistration = !this.windowIsRegistration;
    this.windowType = this.windowType === EntranceWindowType.auth ?
      EntranceWindowType.registration : EntranceWindowType.auth;

    if (this.windowType === EntranceWindowType.registration) {
      const control: AbstractControl = this.userForm.get('name');
      control.enable();
    }
  }
}
