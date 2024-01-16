/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { PATHS_CLIENTE_PAGES } from '@app/config/path-page-cliente';

interface AdminNode {
	name: string;
	constante: string;
	children?: AdminNode[];
}
const TREE_DATA: AdminNode[] = [
	{
		name: 'Documentos',
		constante: '_dteCliente',
		children: []
	},
	{
		name: 'Listar',
		constante: 'demo',
		children: [
			{
				name: 'Listar Dtes',
				constante: '_listar'
			}
		]
	},
	{
		name: 'Invalidaciones',
		constante: 'demo',
		children: [
			{
				name: 'Crear Invalidación',
				constante: '_crearInvalidaciones'
			},
			{
				name: 'Listar Invalidaciones',
				constante: '_listarInvalidaciones'
			}
		]
	}
];

@Component({
	selector: 'app-tree-cliente',
	templateUrl: './tree-cliente.component.html',
	styleUrls: ['./tree-cliente.component.scss']
})
export class TreeClienteComponent implements OnInit {
	constructor(private _router: Router) {}
	nestdDataSource = new MatTreeNestedDataSource<AdminNode>();
	nestdTreeControl = new NestedTreeControl<AdminNode>((node) => node.children);

	ngOnInit(): void {
		this.nestdDataSource.data = TREE_DATA;
	}
	hasNestedChild(index: number, node: AdminNode): number | undefined {
		return node?.children?.length;
	}
	navigateToPage(name: string): void {
		switch (name) {
			//Seguridad
			case '_dteCliente':
				void this._router.navigateByUrl(PATHS_CLIENTE_PAGES.documento.withSlash);
				break;
			case '_crearInvalidaciones':
				void this._router.navigateByUrl(PATHS_CLIENTE_PAGES.crearInvalidaciones.withSlash);
				break;
			//Tablas/areas
			case '_listarInvalidaciones':
				void this._router.navigateByUrl(PATHS_CLIENTE_PAGES.listarInvalidaciones.withSlash);
				break;

			default:
				break;
		}
	}
}
