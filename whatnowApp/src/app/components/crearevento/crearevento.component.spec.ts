import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreareventoComponent } from './crearevento.component';

describe('CreareventoComponent', () => {
  let component: CreareventoComponent;
  let fixture: ComponentFixture<CreareventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreareventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreareventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
