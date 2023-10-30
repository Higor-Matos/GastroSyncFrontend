import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOptionsPanelComponent } from './client-options-panel.component';

describe('ClientOptionsPanelComponent', () => {
  let component: ClientOptionsPanelComponent;
  let fixture: ComponentFixture<ClientOptionsPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientOptionsPanelComponent]
    });
    fixture = TestBed.createComponent(ClientOptionsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
