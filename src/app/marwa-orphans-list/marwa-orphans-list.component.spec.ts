import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarwaOrphansListComponent } from './marwa-orphans-list.component';

describe('MarwaOrphansListComponent', () => {
  let component: MarwaOrphansListComponent;
  let fixture: ComponentFixture<MarwaOrphansListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarwaOrphansListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarwaOrphansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
