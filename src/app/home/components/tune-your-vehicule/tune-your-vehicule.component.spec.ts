import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TuneYourVehiculeComponent } from './tune-your-vehicule.component';

describe('TuneYourVehiculeComponent', () => {
  let component: TuneYourVehiculeComponent;
  let fixture: ComponentFixture<TuneYourVehiculeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TuneYourVehiculeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TuneYourVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
