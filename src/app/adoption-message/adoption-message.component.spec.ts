import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionMessageComponent } from './adoption-message.component';

describe('AdoptionMessageComponent', () => {
  let component: AdoptionMessageComponent;
  let fixture: ComponentFixture<AdoptionMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptionMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
