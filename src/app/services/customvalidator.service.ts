import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidatorService {
  private static urlReg = new RegExp(
    '^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'
  );
  constructor() { }
  urlValidator() : ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValidUrl = CustomvalidatorService.urlReg.test(control.value)
      return !isValidUrl ? {validUrl : {value :control.value}} : null;
    }
  }
}
