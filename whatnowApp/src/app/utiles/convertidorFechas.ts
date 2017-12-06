import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

//formato de transformacion
const dateFormat = 'yyyy-MM-dd';


@Pipe({
  name: 'DateFormatPipe',
})

export class DateFormatPipe implements PipeTransform {

  transform(value: Date) {

    var datePipe = new DatePipe("en-US");
    //var fecha = datePipe.transform(value, 'MM/dd/yyyy');
    var fecha = datePipe.transform(value, dateFormat);

    return fecha;
  }
}
