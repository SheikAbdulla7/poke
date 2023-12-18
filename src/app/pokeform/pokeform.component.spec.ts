import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeformComponent } from './pokeform.component';

describe('PokeformComponent', () => {
  let component: PokeformComponent;
  let fixture: ComponentFixture<PokeformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
