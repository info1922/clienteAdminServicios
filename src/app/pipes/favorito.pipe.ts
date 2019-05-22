import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favorito'
})
export class FavoritoPipe implements PipeTransform {

  transform(items: any, term?: any): any {
    return items.filter(item => item.indexOf(term) !== -1);
  }
}
