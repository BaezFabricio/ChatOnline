import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarPassWordComponent } from './recuperar-pass-word.component';

describe('RecuperarPassWordComponent', () => {
  let component: RecuperarPassWordComponent;
  let fixture: ComponentFixture<RecuperarPassWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarPassWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarPassWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
