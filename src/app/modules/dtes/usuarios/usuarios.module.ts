import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListarPagesComponent } from './pages/listar-pages/listar-pages.component';
import { ListaUsuariosPagesComponent } from './pages/lista-usuarios-pages/lista-usuarios-pages.component';

@NgModule({
	declarations: [ListarPagesComponent, ListaUsuariosPagesComponent],
	imports: [CommonModule, UsuariosRoutingModule]
})
export class UsuariosModule {}
