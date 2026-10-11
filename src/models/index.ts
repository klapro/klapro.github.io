export interface Position {
    lat: number,
    lng: number
};

export interface PinModel {
    id: string,
    name: string,
    icon: string,
    position: Position,
}

export interface ExpModel extends PinModel {
    start: string,
    end: string,
    route?: Position[]
}

export interface LanguageModel {
    id: string,
    tag: string
}