import { EntidadFinacieraPageComponent } from './pages/entidadFinaciera-page/entidadFinaciera-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: EntidadFinacieraPageComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EntidadFinacieraRoutingModule {}
