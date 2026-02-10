import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSection } from './account-section';

describe('AccountSection', () => {
  let component: AccountSection;
  let fixture: ComponentFixture<AccountSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
