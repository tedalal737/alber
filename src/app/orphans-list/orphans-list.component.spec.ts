import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrphansListComponent } from './orphans-list.component';

describe('OrphansListComponent', () => {
  let component: OrphansListComponent;
  let fixture: ComponentFixture<OrphansListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrphansListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrphansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
