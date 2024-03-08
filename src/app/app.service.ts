import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Response} from "../models/interfaces";

@Injectable()
export class DataService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(): Observable<Response> {
    return this.http.get<Response>(environment.apiUrls.backend + "get-all", this.httpOptions)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  save(data: any) {
    return this.http.post(environment.apiUrls.backend + "save", data, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrls.backend + "delete/" + id, this.httpOptions);
  }

  update(data: any) {
    return this.http.patch(environment.apiUrls.backend + "update/" + data.id, {name: data.name, rate: data.rate}, this.httpOptions);
  }

}
