import { Pipe, PipeTransform } from '@angular/core';
import { Register } from '../Interfaces/register';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: Register[], sorting: string):Register[] {
    if(!sorting){
      return value;
    }
    else if(sorting === 'asc'){
      return value.sort((a,b) => a.username.localeCompare(b.username))
    }
    else if(sorting === 'desc'){
      return value.sort((a,b) => b.username.localeCompare(a.username))
    }
    else if(Array.isArray(value)){
      return value;
    }
    return [];
  }

}
