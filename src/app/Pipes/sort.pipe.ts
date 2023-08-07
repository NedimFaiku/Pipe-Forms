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
      return value.sort((a,b) => a.localeCompare(b))
    }
    else if(sorting === 'desc'){
      return value.sort((a,b) => b.localeCompare(a))
    }
    else if(Array.isArray(value)){
      return value;
    }
    return [];
  }

}
