interface Position {
    lat: number,
    lng: number
};

export default interface ExpModel {
    id: string,
    code: string,
    name: string,
    title: string,
    address: string,
    icon: string,
    position: Position,
    monthStart: string,
    yearStart: number,
    monthEnd: string,
    yearEnd: number,
    description: string
}