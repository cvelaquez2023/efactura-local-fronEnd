/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClienteDteApiService } from './../../service/cliente-dte-api.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IResponseDtes } from '@app/modules/ci/articulo/model/articulo-api-model-interface';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { ListaObservacionesComponent } from '../lista-observaciones/lista-observaciones.component';
import { strict } from 'assert';
import { EnvioEmailComponent } from '../envio-email/envio-email.component';
interface Opcion {
	value: string;
}

@Component({
	selector: 'app-lista-cliente-dte',
	templateUrl: './lista-cliente-dte.component.html',
	styleUrls: ['./lista-cliente-dte.component.scss']
})
export class ListaClienteDteComponent implements OnInit, AfterViewInit {
	selectedCar!: string;
	selectedAno!: string;
	mes = new Date().getMonth() + 1;
	years: Opcion[] = [];
	now: Date = new Date();
	actualYear: number = this.now.getFullYear();
	yearsSelected: string[] = [
		(this.actualYear - 4).toString(),
		(this.actualYear - 3).toString(),
		(this.actualYear - 2).toString(),
		(this.actualYear - 1).toString(),
		this.actualYear.toString()
	];

	formGroup!: FormGroup;
	//mes = this.hoy.getMonth.toString();
	constructor(
		private _snotifyService: SnotifyService,
		private _dteApiService: ClienteDteApiService,
		private _dialog: MatDialog,
		private _formBuilder: FormBuilder
	) {
		this.selectedCar = this.mes.toString();
		this.selectedAno = this.actualYear.toString();
	}

	listaDocumentos = new MatTableDataSource<IResponseDtes>();
	displayedColumns: string[] = [
		'fechaEmision',
		'tipoDte',
		'numeroControl',
		'selloRecibido',
		'estado',
		'nombreEmisor',
		'documentoEmisor',
		'montoTotal',
		'actions'
	];
	@ViewChild(MatSort)
	sort!: MatSort;
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	//searchKey!: 'carlos';
	ngOnInit(): void {
		this._loadFormGroup();

		this.getYears();

		/*
		setInterval(() => {
			this._loadDoc('2023', '12');
		}, 20000);
	*/
	}
	getYears() {
		let year = new Date().getFullYear();
		let yearant = year - 5;
		for (let i = yearant; i <= year; i++) {
			this.years.push({ value: i.toString() });
		}
	}
	private _loadDoc(ano: string, mes: string): void {
		this._dteApiService.getDte(ano, mes).subscribe({
			next: (response) => {
				this.listaDocumentos.data = response.result;
			},
			error: (error) => {
				console.log('er', error);
			}
		});
	}

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			ano: [],
			mes: []
		});
		this.formGroup.controls['mes'].setValue(this.mes);
		this.formGroup.controls['ano'].setValue(this.actualYear);
		this._loadDoc(this.anoField.value as string, this.mesField.value as string);
	}
	ngAfterViewInit(): void {
		this.listaDocumentos.paginator = this.paginator;
		this.listaDocumentos.sort = this.sort;
	}
	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.listaDocumentos.filter = filterValue.trim().toLowerCase();
	}
	clickDelete(): void {}
	clickImprimir(element: any): void {
		this._dteApiService.getDteDescargar(element.Dte).subscribe((response) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			let file = element.Dte + '.pdf';
			let fileNamae = response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
			let bolb: Blob = response.body as Blob;
			let a = document.createElement('a');
			a.download = file;
			a.href = window.URL.createObjectURL(bolb);
			a.click();
		});
	}
	clickCB(element: any): void {
		this._dialog
			.open(EnvioEmailComponent, {
				width: '30%',
				data: element
			})
			.afterClosed()
			.subscribe((val) => {
				if (val === 'update') {
					this._loadDoc(this.anoField.value as string, this.mesField.value as string);
				}
			});
	}
	clickCH(element: any): void {
		this._dteApiService.postDteMh(element.Dte).subscribe({
			next: (response) => {
				if (response.success) {
					this._snotifyService.info(response.errors[0], { position: SnotifyPosition.rightTop });
					this._loadDoc(this.anoField.value as string, this.mesField.value as string);
				} else {
					this._snotifyService.error(response.errors[0], { position: SnotifyPosition.rightTop });
				}
			},
			error: (error) => {
				console.log('er', error);
			}
		});
	}
	clickEdit(element: any): void {
		this._dialog
			.open(ListaObservacionesComponent, {
				width: '30%',
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				data: element
			})
			.afterClosed()
			.subscribe((val) => {
				if (val === 'update') {
					this._loadDoc(this.anoField.value as string, this.mesField.value as string);
				}
			});
	}
	selectMes(mes: string): void {
		this._loadDoc(this.anoField.value as string, mes);
	}
	selectAno(ano: string): void {
		this._loadDoc(ano, this.mesField.value as string);
	}
	get anoField(): AbstractControl {
		return this.formGroup.get('ano')!;
	}
	get mesField(): AbstractControl {
		return this.formGroup.get('mes')!;
	}
}
