import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpParams} from "@angular/common/http";
import { EnergyForecast } from './energyForecast';
import { DateFormatPipe } from './dateFormatPipe';
import { Moment } from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  //private forecastUrl = 'http://localhost:8090/supplier/photovoltaicPanels/${id}/energyOutputForecast?maxTimestampOffset=&{maxTimestampOffset}';

  constructor(private _http: HttpClient,private _dateFormatPipe:DateFormatPipe) { }

  getForecast(id: number, type: string, entitiyType : string, startDate : Moment, endDate: Moment ) {
    let forecastType ="";
    if(type === "supplier"){
      forecastType = "energyOutputForecast";
    }
    if(type === "consumer"){
      forecastType = "demandForecast";
    }
    let startDateFormatted = this._dateFormatPipe.transform(startDate);
    let endDateFormatted = this._dateFormatPipe.transform(endDate);
    return this._http.get<EnergyForecast>('http://localhost:8090/'+type+'/'+ entitiyType+ '/'+ id + '/'+forecastType+'?endDate='+endDateFormatted + "&startDate="+ startDateFormatted) .pipe(
      map(forecastResponse => (forecastResponse as any)),
      tap(result => console.log('fetched result:'+ result)),
      catchError(this.handleError("Get forecast",[]))
    );
  }

  getAllIds(type : string, entitiyType : string){
    let observable =  this._http.get("http://localhost:8090/"+ type+ "/"+entitiyType).pipe(
      map(entityList => (entityList as any)),
      tap(_ => console.log('fetched result')),
      catchError(this.handleError("Get all "+type,[]))
    );
    return observable;
    //observable.subscribe(entityList => entityList.forEach(entry =>console.log(entry.id)));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
