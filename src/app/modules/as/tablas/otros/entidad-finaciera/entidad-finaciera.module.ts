import { EntidadFinacieraPageComponent } from './pages/entidadFinaciera-page/entidadFinaciera-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntidadFinacieraRoutingModule } from './entidad-finaciera-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AngularMaterialModule } from '@app/angular-material-modulo';

@NgModule({
	declarations: [EntidadFinacieraPageComponent],
	imports: [
		CommonModule,
		EntidadFinacieraRoutingModule,
		FormsModule,
		MatTableModule,
		MatIconModule,
		AngularMaterialModule,
		ReactiveFormsModule
	]
})
export class EntidadFinacieraModule {}
