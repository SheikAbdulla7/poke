import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeitemComponent } from './pokeitem.component';

describe('PokeitemComponent', () => {
  let component: PokeitemComponent;
  let fixture: ComponentFixture<PokeitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokeitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
