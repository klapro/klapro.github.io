import SkillModel from "@/models/SkillModel";


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
    img: string,
    position: Position,
    monthStart: string,
    yearStart: number,
    monthEnd: string,
    yearEnd: number,
    description: string
}