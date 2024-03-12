import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DataService} from "./app.service";
import {Response, Stats} from "../models/interfaces";
import {tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  newRange = new FormControl(50);
  newForm = new FormGroup({
    name: new FormControl(''),
    rate: this.newRange
  });
  editRange = new FormControl(50);
  editForm = new FormGroup({
    name: new FormControl(''),
    rate: this.editRange
  });
  editItem: any;
  movieList: any[] = [];
  totalCount: number | undefined;
  stats: Stats | undefined;
  pages: Array<number> = [1];
  searchControl = new FormControl('');


  constructor(private dataService: DataService) {
  }


  ngOnInit() {
    this.getAllAndStats();
  }

  onSubmit() {
    this.dataService.save(this.newForm.value).pipe(
      tap(() => {
        this.getAllAndStats();
      })
    )
      .subscribe();
  }

  deleteMovie(id: number) {
    this.dataService.delete(id).pipe(
      tap(() => {
        this.getAllAndStats();
      })
    )
      .subscribe();
  }

  editMovie(id: number) {
    const item = this.movieList.find(i => i.id === id);
    this.editItem = item;
    this.editForm.patchValue({
      name: item.name,
      rate: item.rate
    });
  }

  backToNewForm() {
    this.editItem = undefined;
  }

  updateMovie(id: number) {
    const updatedData = {
      ...this.editForm.value,
      id
    };
    this.dataService.update(updatedData).pipe(
      tap(() => {
        this.getAllAndStats();
      })
    )
      .subscribe();
    this.backToNewForm();
  }

  getAllAndStats(page: number = 1, search: string | null = '') {
    this.dataService.getAll(page, search).subscribe(
      (response: Response) => {
        this.movieList = response.items;
        this.totalCount = response.count;
        this.pages = Array(Math.ceil(this.totalCount / 10))
          .fill(0)
          .map((x, i) => i + 1);
      });
    this.dataService.getStats().subscribe(
      (response: Stats) => {
        this.stats = response;
      }
    );
  }

  cancelSearch() {
    this.searchControl.reset();
    this.getAllAndStats();
  }
}
