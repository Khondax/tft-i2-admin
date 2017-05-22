import { FormControl } from '@angular/forms';

export class EmailValidator {

static isValid(control: FormControl){

var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@administrador.es/.test(control.value);

if (re){
return null;
}

return {"invalidEmail": true};
}

}