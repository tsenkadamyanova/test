import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchListComponent } from './launch-list.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { RelativeTimePipe } from '../core/helpers/pipes/relative-time/relative-time.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store, StateObservable, StoreModule } from '@ngrx/store';
import { launchReducers } from '../store/reducers';
import { Apollo } from 'apollo-angular';

describe('LaunchListComponent', () => {
  let component: LaunchListComponent;
  let fixture: ComponentFixture<LaunchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        MatCardModule,
        MatProgressSpinnerModule,
        StoreModule.forRoot(launchReducers)
      ],
      declarations: [ 
        LaunchListComponent,
        RelativeTimePipe
      ],
      providers: [
        Apollo
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
