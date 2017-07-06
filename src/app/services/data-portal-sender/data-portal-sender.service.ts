import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {IConfiguredPart} from '../../interfaces/configured-part';
import {IPart} from '../../interfaces/part';

@Injectable()
export class DataPortalSenderService {
    private _url: string;

    constructor(private http: Http) {
    }

    configuratorRequest(configuredParts: IConfiguredPart[], token: string, rootPartNumber: string) {
        const requestBody = {
            data: {
                type: 'configuratorrequest',
                attributes: {
                    token: token,
                    root: rootPartNumber,
                    parts: configuredParts
                }
            }
        };

        return this.http.post(this._url + 'api/configurators/parts', requestBody).toPromise();
    }

    selectorRequest(parts: IPart[], token: string) {
        const requestBody = {
            data: {
                type: 'selectorrequest',
                attributes: {
                    token: token,
                    parts: parts
                }
            }
        };

        return this.http.post(this._url + 'api/configurators/parts', requestBody).toPromise();
    }

    set url(value: string) {
        this._url = value;
    }

}
