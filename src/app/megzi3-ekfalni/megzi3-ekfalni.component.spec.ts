import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Megzi3EkfalniComponent } from './megzi3-ekfalni.component';

describe('Megzi3EkfalniComponent', () => {
  let component: Megzi3EkfalniComponent;
  let fixture: ComponentFixture<Megzi3EkfalniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Megzi3EkfalniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Megzi3EkfalniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
