export enum BookStatus {
    DOSTUPNA = 'dostupna',
    ZADUZENA = 'zaduzena',
    }
    export enum BookCondition {
    NOVO = 'novo',
    DOBRO = 'dobro',
    KORISCENO = 'korisceno',
    OSTECENO = 'osteceno',
    }
    export interface Book {
    id: number;
    naslov: string;
    autor: string;
    isbn: string;
    status: BookStatus;
    stanje: BookCondition;
}