import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AddFruitDto, Fruit} from "../features/fruits/components/overview/models/fruits.models";

@Injectable({
  providedIn: 'root'
})
export class ServicesApiServiceService {

  baseUrl = 'http://localhost/api';

  constructor(private http:HttpClient) { }

  getFruits(): Observable<Fruit[]>{
    return this.http.get(`${this.baseUrl}/fruits/`) as Observable<Fruit[]>;
  }

  getFruit(fruitId: string): Observable<Fruit>{
    return this.http.get(`${this.baseUrl}/fruits/${fruitId}`) as Observable<Fruit>;
  }

  addFruit(fruit: AddFruitDto): Observable<Fruit>{
    return this.http.post(`${this.baseUrl}/fruits/`, fruit) as Observable<Fruit>;
  }

  deleteFruit(fruitId: string): Observable<Fruit>{
    return this.http.delete(`${this.baseUrl}/fruits/${fruitId}/`) as Observable<Fruit>;
  }

  updateFruit(fruitId: number, fruit: Fruit): Observable<Fruit>{
    return this.http.put(`${this.baseUrl}/fruits/${fruitId}/`, fruit) as Observable<Fruit>;
  }
}
