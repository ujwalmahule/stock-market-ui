import { SectorModel } from './sector-model';
import { ExchangeModel } from './exchange-model';
export interface CompanyModel {
    id: number
    companyName: string
    ceo: string
    boardOfDirectors: string
    exchange: ExchangeModel[]
    turnover: number
    sector: SectorModel
    briefWriteup: string
}
