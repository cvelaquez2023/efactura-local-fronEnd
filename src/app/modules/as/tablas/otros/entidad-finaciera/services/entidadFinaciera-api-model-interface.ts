export interface IResponseEntidadFinaciera {
	codEntidadFinaciera: string;
	docTributarioId: string;
	descripcion: string;
	codElectronico: string;
	id: number;
	isDelete: boolean;
}

export interface IRequestCreateEntidadFinaciera {
	codEntidadFinaciera: string;
	docTributarioId: string;
	descripcion: string;
	codElectronico: string;
}
