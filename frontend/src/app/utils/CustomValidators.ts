import { FormGroup } from '@angular/forms';

export default abstract class CustomValidators {
    public static passwordMatchingValidatior(form: FormGroup): null {
        const password = form.controls['password'].value;
        const confirmation = form.controls['confirmPassword'].value;

        if (!password || !confirmation) {
            // if the password or confirmation has not been inserted ignore
            return null;
        }

        if (confirmation.length > 0 && confirmation !== password) {
            confirmation.setErrors({ notMatch: true }); // set the error in the confirmation input/control
        }

        return null; // always return null here since as you'd want the error displayed on the confirmation input
    }
}
