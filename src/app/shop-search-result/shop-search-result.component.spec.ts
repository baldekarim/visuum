import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSearchResultComponent } from './shop-search-result.component';

describe('ShopSearchResultComponent', () => {
  let component: ShopSearchResultComponent;
  let fixture: ComponentFixture<ShopSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
