import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptersListComponent } from './adopters-list.component';

describe('AdoptersListComponent', () => {
  let component: AdoptersListComponent;
  let fixture: ComponentFixture<AdoptersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
