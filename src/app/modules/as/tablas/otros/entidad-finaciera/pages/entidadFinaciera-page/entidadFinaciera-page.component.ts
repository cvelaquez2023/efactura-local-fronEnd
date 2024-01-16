import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { EntidadFinacieraApiiService } from '../../services/entidad-finaciera-apii.service';
import { MatTableDataSource } from '@angular/material/table';
import { IResponseEntidadFinaciera } from '../../services/entidadFinaciera-api-model-interface';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'app-entidadFinaciera-page',
	templateUrl: './entidadFinaciera-page.component.html',
	styleUrls: ['./entidadFinaciera-page.component.scss']
})
export class EntidadFinacieraPageComponent implements OnInit, AfterViewInit {
	constructor(
		private _snotifyService: SnotifyService,
		private _dialog: MatDialog,
		private _EntidadFinacieraApiService: EntidadFinacieraApiiService
	) {}
	listaEntidadesFinacieras = new MatTableDataSource<IResponseEntidadFinaciera>();
	displayedColumns: string[] = ['codEntidadFincanceira', 'nombre', 'actions'];
	@ViewChild(MatSort)
	sort!: MatSort;
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	searchKey!: 'carlos';
	ngOnInit(): void {
		this._loadVendedor(1, 100000);
	}
	ngAfterViewInit(): void {
		this.listaEntidadesFinacieras.paginator = this.paginator;
		this.listaEntidadesFinacieras.sort = this.sort;
	}
	private _loadVendedor(page: number, rows: number): void {
		this._EntidadFinacieraApiService.getEntidadFinaciera(page, rows).subscribe({
			next: (response) => {
				if (response.success) {
					this.listaEntidadesFinacieras.data = response.result;
				} else {
					this._snotifyService.error(response.errors[0], { position: SnotifyPosition.rightTop });
				}
			},
			error: () => {
				console.log('error');
			}
		});
	}
	openDialog(): void {}
	applyFilter(event: Event): void {}
	clickEdit(element: any): void {}
	clickDelete(element: any): void {}
}
