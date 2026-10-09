
export default interface SkillModel {
    id: string,
    icon: string,
    name: string,
    rating: number,
    years: number,
    iconBottom?: boolean,
    subskills?: SkillModel[]
}