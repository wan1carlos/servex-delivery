import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EarnPage } from './earn.page';

describe('EarnPage', () => {
  let component: EarnPage;
  let fixture: ComponentFixture<EarnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EarnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
