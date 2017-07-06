import {Component, OnInit} from '@angular/core';

import {Md5} from 'ts-md5/dist/md5';

import {IConfiguredPart} from '../../interfaces/configured-part';
import {DataPortalSenderService} from '../../services/data-portal-sender/data-portal-sender.service';
import {DataPortalIFrameService} from '../../services/data-portal-iframe/data-portal-iframe.service';


@Component({
    selector: 'app-configurator',
    templateUrl: './configurator.component.html'
})
export class ConfiguratorComponent implements OnInit {
    private _articleData = {
        quantity: {
            translation: 'Quantity'
        },
        description: {
            translation: 'Description'
        },
        P_ARTICLE_VOLTAGE: {
            values: ['24 V', '30 V', '50 V', '60 V', '125V ', '230 V', '250 V', '300 V'],
            translation: 'Voltage'
        },
        P_ARTICLE_CABLEWIRECOUNT: {
            values: ['5x2', '6X', '6G', '8x2', '10x2'],
            translation: 'Wire count'
        },
        P_ARTICLE_CABLEWIRECROSSSECTION: {
            values: ['1.0 mm²', '1.25 mm²', '2.0 mm²', '2.5 mm²'],
            translation: 'Wire cross section'
        },
        P_ARTICLE_ELECTRICALCURRENT: {
            values: ['1 A', '2 A', '10 A', '25 A', '50 A', '100 A', '250 A', '500 A', '1000 A'],
            translation: 'Electrical current'
        },
        P_ARTICLE_PINCOUNT: {
            values: ['1', '2', '3', '4', '5', '6'],
            translation: 'Pin count'
        }
    };
    private _configuredPart: IConfiguredPart;
    private _configuredParts: IConfiguredPart[] = [];
    private _rootPartNumber: string;
    private _token: string;
    private _customData: string;
    private _dataSet: number;

    constructor(private iFrameService: DataPortalIFrameService, private sender: DataPortalSenderService) {
        this._configuredPart = {
            quantity: undefined,
            description: undefined,
            part: {
                P_ARTICLE_PARTNR: undefined,
                P_ARTICLE_ORDERNR: undefined,
                P_ARTICLE_TYPENR: undefined
            },
            variant: {
                P_ARTICLE_VOLTAGE: undefined,
                P_ARTICLE_CABLEWIRECOUNT: undefined,
                P_ARTICLE_CABLEWIRECROSSSECTION: undefined,
                P_ARTICLE_ELECTRICALCURRENT: undefined,
                P_ARTICLE_PINCOUNT: undefined
            }
        };
    }

    async ngOnInit() {
        await this.iFrameService.handleDataPortalData();

        this._rootPartNumber = this.iFrameService.rootPartNumber;
        this.adaptDataSet();
        this._customData = this.iFrameService.customData;
        this._token = this.iFrameService.token;

        this.sender.url = this.iFrameService.callbackUrl;
    }

    private adaptDataSet() {
        if(this._rootPartNumber === 'BLO.PC-0724-800-0') {
            this._dataSet = 2;
        } else {
            this._dataSet = 1;
        }
    }

    public addConfiguredPart() {
        const hash: Md5 = new Md5();
        let hashString: string;

        for (const variantProperty in this._configuredPart.variant) {
            if (this._configuredPart.variant.hasOwnProperty(variantProperty) && this._configuredPart.variant[variantProperty]) {
                hash.appendStr(this._configuredPart.variant[variantProperty]);
            }
        }
        hashString = hash.end().toString();

        this._configuredPart.part.P_ARTICLE_PARTNR = `${this._rootPartNumber}-${hashString}`;
        this._configuredPart.part.P_ARTICLE_ORDERNR = `${this._rootPartNumber}-${hashString}`;
        this._configuredPart.part.P_ARTICLE_TYPENR = `${this._rootPartNumber}-${hashString}`;

        this._configuredParts.push(JSON.parse(JSON.stringify(this._configuredPart)));
    }

    public async sendConfiguredParts() {
        await this.sender.configuratorRequest(this._configuredParts, this._token, this._rootPartNumber);
        this.iFrameService.closeIFrame();
    }

    get articleData() {
        return this._articleData;
    }

    get configuredPart(): IConfiguredPart {
        return this._configuredPart;
    }

    get configuredParts(): IConfiguredPart[] {
        return this._configuredParts;
    }

    get customData(): string {
        return this._customData;
    }

    get dataSet(): number {
        return this._dataSet;
    }

    get rootPartNumber(): string {
        return this._rootPartNumber;
    }
}
