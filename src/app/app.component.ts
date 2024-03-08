import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DataService} from "./app.service";
import {Response} from "../models/interfaces";
import {tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  range = new FormControl(50);

  newForm = new FormGroup({
    name: new FormControl(''),
    rate: this.range
  });
  editForm = new FormGroup({
  });
  MovieList: any[] = [];
  totalCount: number | undefined;
  editData: any;

  constructor(private dataService: DataService) {
  }


  ngOnInit() {
    this.getAll();
  }

  onSubmit() {
    this.dataService.save(this.newForm.value).pipe(
       tap(() => {
         this.getAll();
       })
    )
    .subscribe();
  }

  deleteMovie(id: number) {
    this.dataService.delete(id).pipe(
       tap(() => {
         this.getAll();
       })
    )
    .subscribe();
  }

  editMovie(id: number) {
    const item = this.MovieList.find(i => i.id === id);
    item.edit = true;
    this.editData = item;
  }

  updateMovie(id: number) {
    const updatedData = {
    ...this.editForm.value,
    id
  };
    this.dataService.update(updatedData).pipe(
       tap(() => {
         this.getAll();
       })
    )
    .subscribe();
  }

  getAll(){
    this.dataService.getAll().subscribe(
        (response: Response) => {
          this.MovieList = response.items;
          this.totalCount = response.count;
        });
  }
}
