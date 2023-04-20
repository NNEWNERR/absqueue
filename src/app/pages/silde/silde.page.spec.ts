import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SildePage } from './silde.page';

describe('SildePage', () => {
  let component: SildePage;
  let fixture: ComponentFixture<SildePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SildePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
