import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpParams} from "@angular/common/http";
import { DateFormatPipe } from './dateFormatPipe';
import { Moment } from 'moment';
import { SolverSolution } from './solverSolution';
@Injectable({
  providedIn: 'root'
})
export class SolverFetchService {

  constructor(private _http: HttpClient,private _dateFormatPipe:DateFormatPipe) { }

  getSolution(startDate : Moment, endDate: Moment, calculationBound : number, exportPriceInCent : number, stepCount : number, timeout: number) {
    let startDateFormatted = this._dateFormatPipe.transform(startDate);
    let endDateFormatted = this._dateFormatPipe.transform(endDate);
    return this._http.get<SolverSolution>('http://localhost:8090/solver?calculationBound='+ calculationBound + '&endDate='+ 
    endDateFormatted + '&exportPrice='+ exportPriceInCent+ '&startDate='+startDateFormatted + "&maxSteps="+stepCount+ "&timeoutInS="+timeout) .pipe(
      //map(response => (response as SolverSolution)),
      tap(result => console.log('fetched result:'+ result)),
      catchError(this.handleError("Get forecast",[]))
    );
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
