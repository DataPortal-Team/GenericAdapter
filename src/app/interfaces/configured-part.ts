import {IPartInfo} from './part-info';
import {IVariantInfo} from './variant-info';

export interface IConfiguredPart {
    quantity: number;
    description: string;
    part: IPartInfo;
    variant: IVariantInfo
}
