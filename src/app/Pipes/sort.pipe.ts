import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  
  transform(value: string[], sorting: string):string[] {
    if(!sorting){
      return value;
    }
    else if(sorting === 'asc'){
      return value.sort((a,b) => (a < b ? 1: -1))
    }
    else if(sorting === 'desc'){
      return value.sort((a,b) => (a > b ? 1: -1))
    }
    else if(Array.isArray(value)){
      return value;
    }
    return [];
  }

}
