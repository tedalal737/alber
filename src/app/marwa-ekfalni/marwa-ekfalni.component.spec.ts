import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarwaEkfalniComponent } from './marwa-ekfalni.component';

describe('MarwaEkfalniComponent', () => {
  let component: MarwaEkfalniComponent;
  let fixture: ComponentFixture<MarwaEkfalniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarwaEkfalniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarwaEkfalniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
