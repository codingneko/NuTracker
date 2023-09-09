import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../utils/Constants';
import Nut from '../models/entity/nut.interface';

@Injectable({
    providedIn: 'root',
})
export class NutService {
    constructor(private httpClient: HttpClient) {}

    postNut(nut: Nut) {
        return this.httpClient.post<Nut>(Constants.base_nut_url, nut);
    }
}
