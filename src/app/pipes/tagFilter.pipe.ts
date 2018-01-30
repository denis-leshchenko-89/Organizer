import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'tagFilterPipe'
})

@Injectable()
export class tagFilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        if (!items) {
            return [];
        }
        if (!field || !value) {
            return items;
        }

        var filtered=[];
        
         items.forEach((tagItem) =>{
             tagItem[field].forEach( (item) =>{
                 if (item['id'] == value)
                    {
                     filtered.push(tagItem); 
                    }
                });
        });
          return filtered
       
    }
}