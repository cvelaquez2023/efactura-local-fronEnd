/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EntidadFinacieraPageComponent } from './entidadFinaciera-page.component';

describe('EntidadFinacieraPageComponent', () => {
	let component: EntidadFinacieraPageComponent;
	let fixture: ComponentFixture<EntidadFinacieraPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EntidadFinacieraPageComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EntidadFinacieraPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
