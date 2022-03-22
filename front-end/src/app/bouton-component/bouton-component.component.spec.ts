import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutonComponentComponent } from './bouton-component.component';

describe('BoutonComponentComponent', () => {
  let component: BoutonComponentComponent;
  let fixture: ComponentFixture<BoutonComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoutonComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoutonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
