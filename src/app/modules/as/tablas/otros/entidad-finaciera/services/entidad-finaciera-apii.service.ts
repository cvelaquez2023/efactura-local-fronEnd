import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app/shared/api-models-base-interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponseEntidadFinaciera } from './entidadFinaciera-api-model-interface';

const URL_ENTIDADFINACIERA = environment.host + '/AS/EntidadFinaciera';

@Injectable({
	providedIn: 'root'
})
export class EntidadFinacieraApiiService {
	constructor(private _httpClient: HttpClient) {}
	getEntidadFinaciera(page?: number, rows?: number): Observable<IResponse<IResponseEntidadFinaciera[]>> {
		let url = URL_ENTIDADFINACIERA;
		// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
		url = url + '?page=' + page + '&rows=' + rows;
		return this._httpClient.get<IResponse<IResponseEntidadFinaciera[]>>(url);
	}
}
