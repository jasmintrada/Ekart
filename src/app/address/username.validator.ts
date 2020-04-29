import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
@Directive({
    selector: '[validateUserName]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: UserValidator, multi: true }
    ]
})
export class UserValidator implements Validator {
    validate(control: FormControl): { [key: string]: any } {
        const emailRegexp = /^[A-Za-z ]*$/;
        if (!emailRegexp.test(control.value)) {
            return { "userInvalid": "User name should only contain alphabates and spaces" };
        }
        return null;
    }
}
 
