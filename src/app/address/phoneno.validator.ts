import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
@Directive({
    selector: '[validatePhone]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: PhoneValidator, multi: true }
    ]
})
export class PhoneValidator implements Validator {
    validate(control: FormControl): { [key: string]: any } {
        const emailRegexp = /^[0-9]{10}$/;
        if (!emailRegexp.test(control.value)) {
            return { "phoneInvalid": "Phone number is invalid" };
        }
        return null;
    }
}
 
