import {Injectable} from '@angular/core';

@Injectable()
export class DataPortalIFrameService {
    private _token: string;
    private _rootPartNumber: string;
    private _orderNumber: string;
    private _typeNumber: string;
    private _callbackUrl: string;
    private _customData: string;
    private _iFrameSource: Window;
    private _iFrameInitialized = false;

    public handleDataPortalData(): Promise<boolean> {
        return new Promise((resolve) => {
            window.addEventListener('message', (e) => {
                if (e.data.type === 'data') {
                    const data = e.data.body;
                    this._token = data.token;
                    this._rootPartNumber = data.root_part_number;
                    this._callbackUrl = data.follow_up_url;
                    this._customData = data.custom_data;
                    this._orderNumber = data.order_number;
                    this._typeNumber = data.type_number;
                    resolve(true);
                } else if (e.data.type === 'status' && e.data.body === 'init') {
                    if (!this._iFrameInitialized) {
                        this._iFrameInitialized = true;
                        this._iFrameSource = e.source;
                        this._iFrameSource.postMessage({'type': 'status', 'body': 'init'}, '*')
                    }
                }
            });
        })
    }

    public closeIFrame() {
        this._iFrameSource.postMessage({'type': 'status', 'body': 'done'}, '*');
    }

    get token(): string {
        return this._token;
    }

    get rootPartNumber(): string {
        return this._rootPartNumber;
    }

    get callbackUrl(): string {
        return this._callbackUrl;
    }

    get customData(): string {
        return this._customData;
    }

}
