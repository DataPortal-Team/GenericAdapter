import {Component, OnInit} from '@angular/core';
import {DataPortalIFrameService} from '../../services/data-portal-iframe/data-portal-iframe.service';
import {DataPortalSenderService} from '../../services/data-portal-sender/data-portal-sender.service';
import {IPart} from '../../interfaces/part';

@Component({
    selector: 'app-selector',
    templateUrl: './selector.component.html'
})
export class SelectorComponent implements OnInit {
    private _parts: string[] = ['BLO.PC-0724-480-0', 'BLO.PC-0724-800-0', 'BLO.PC-0724-800-1', 'BLO.PC-0824-480-0',
        'BLO.PC-0824-480-1', 'BLO.PC-3724-800-0', 'BLO.PM-0712-200-0', 'BLO.PM-0712-400-0', 'BLO.PM-0724-120-0'
    ];
    private _selectedParts: string[] = [];
    private token: string;

    constructor(private iFrameService: DataPortalIFrameService, private sender: DataPortalSenderService) {
    }

    async ngOnInit() {
        await this.iFrameService.handleDataPortalData();

        this.token = this.iFrameService.token;

        this.sender.url = this.iFrameService.callbackUrl;
    }

    public addPart(part: string) {
        this._parts.splice(this._parts.indexOf(part), 1);
        this._selectedParts.push(part);
    }

    public removePart(part: string) {
        this._selectedParts.splice(this._selectedParts.indexOf(part), 1);
        this._parts.push(part);
    }

    get parts(): string[] {
        return this._parts;
    }

    get selectedParts(): string[] {
        return this._selectedParts;
    }

    public async sendParts() {
        const parts: IPart[] = [];
        this._selectedParts.forEach((part) => {
            parts.push({
                part: { P_ARTICLE_PARTNR: part },
                quantity: 1,
                description: 'Part ' + part
            })
        });

        await this.sender.selectorRequest(parts, this.token);
        this.iFrameService.closeIFrame();
    }
}
