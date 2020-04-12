import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Megzi3OrphansListComponent } from './megzi3-orphans-list.component';

describe('Megzi3OrphansListComponent', () => {
  let component: Megzi3OrphansListComponent;
  let fixture: ComponentFixture<Megzi3OrphansListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Megzi3OrphansListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Megzi3OrphansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
