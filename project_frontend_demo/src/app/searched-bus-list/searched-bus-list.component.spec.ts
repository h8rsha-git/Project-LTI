import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedBusListComponent } from './searched-bus-list.component';

describe('SearchedBusListComponent', () => {
  let component: SearchedBusListComponent;
  let fixture: ComponentFixture<SearchedBusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchedBusListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchedBusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
