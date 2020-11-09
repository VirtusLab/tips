import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipGroupComponent } from './tip-group.component';

describe('TipGroupComponent', () => {
  let component: TipGroupComponent;
  let fixture: ComponentFixture<TipGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
