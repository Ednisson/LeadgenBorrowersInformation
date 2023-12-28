import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerslistComponent } from './borrowerslist.component';

describe('BorrowerslistComponent', () => {
  let component: BorrowerslistComponent;
  let fixture: ComponentFixture<BorrowerslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowerslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
