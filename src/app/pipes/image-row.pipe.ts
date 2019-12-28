import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'imagerow'})

export class ImageRowPipe implements PipeTransform {
    transform(items: any[], rowNr: number, totalRows: number): any {

        let iterations = Math.ceil(items.length / totalRows);
        let rowItems = [];
        for(let i = 0; i < iterations;i++)
        {

            let sliced = items.slice(i*totalRows, (i+1)*totalRows);

            if(sliced.length >= rowNr)
            {
                rowItems.push(sliced[rowNr - 1])
            }         
        }
        return rowItems;
        
    }
}