import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DataService } from './app.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    dataService = jasmine.createSpyObj('DataService', ['delete', 'update', 'getAll', 'getStats']);

    TestBed.configureTestingModule({
      providers: [
        { provide: DataService, useValue: dataService }
      ]
    });

    component = TestBed.createComponent(AppComponent).componentInstance;
  });

  it('should call delete and refresh data', () => {
    const id = 1;
    // dataService.delete.and.returnValue(of(null));

    component.deleteMovie(id);

    expect(dataService.delete).toHaveBeenCalledWith(id);
    expect(dataService.getAll).toHaveBeenCalled();
    expect(dataService.getStats).toHaveBeenCalled();
  });

  it('should set edit values', () => {
    const id = 1;
    const name = 'Movie 1';
    const rate = 5;
    component.movieList = [{ id, name, rate }];

    component.editMovie(id);

    expect(component.editItem).toEqual({ id, name, rate });
    expect(component.editForm.value).toEqual({ name, rate });
  });

  it('should clear editItem', () => {
    component.editItem = { id: 1 };

    component.backToNewForm();

    expect(component.editItem).toBeUndefined();
  });

  it('should call update and refresh data', () => {
    const id = 1;
    const updatedData = { id, name: 'New Name', rate: 5 };
    // dataService.update.and.returnValue(of(null));

    component.updateMovie(id);

    expect(dataService.update).toHaveBeenCalledWith(updatedData);
    expect(dataService.getAll).toHaveBeenCalled();
    expect(dataService.getStats).toHaveBeenCalled();
  });

  it('should get data and stats', () => {
    dataService.getAll.and.returnValue(of({items: [], count: 0}));
    // dataService.getStats.and.returnValue(of({stats: {}}));

    component.getAllAndStats();

    expect(dataService.getAll).toHaveBeenCalled();
    expect(dataService.getStats).toHaveBeenCalled();
  });
});
