import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardFormat'
})
export class CreditCardFormatPipe implements PipeTransform {
  formatedCreditCard: string = '';
  error: string = "Credit card number can not be empty, less or greater than 16 digits!!!";
  transform(value: string) {
    if(value && value.length == 16){
      for(let i=0; i<16; i+=4){
        this.formatedCreditCard += value.slice(i, i+4) + "...."
      }
      this.formatedCreditCard = this.formatedCreditCard.slice(0, this.formatedCreditCard.length -4)
      return this.formatedCreditCard
    }
    else{
      return this.error
    }
  }

}
