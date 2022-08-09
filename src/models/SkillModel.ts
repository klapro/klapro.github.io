
export default interface SkillModel {
    id: string,
    img: string,
    name: string,
    rating: number,
    years: number,
    iconBottom?: boolean,
    subskills?: SkillModel[]
}