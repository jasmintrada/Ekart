import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
@Directive({
    selector: '[validatePincode]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: PincodeValidator, multi: true }
    ]
})
export class PincodeValidator implements Validator {
    validate(control: FormControl): { [key: string]: any } {
        const emailRegexp = /^[0-9]{6}$/;
        if (!emailRegexp.test(control.value)) {
            return { "pincodeInvalid": "pincode should be of 6 digits only." };
        }
        return null;
    }
}
 
