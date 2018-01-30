import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'categoryFilterPipe'
})

@Injectable()
export class categoryFilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        if (!items) {
            return [];
        }
        if (!field || !value) {
            return items;
        }
  
        var filtered = [];
        items.forEach((categoryItem) => {
            categoryItem[field].forEach((item) => {
                if (item['id'] == value) {
                    filtered.push(categoryItem);
                }
            });
        });
        return filtered

    }
}