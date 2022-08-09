import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import SkillModel from "../../models/SkillModel";

@Module
export default class SkillModule extends VuexModule {
    items : SkillModel[] = [
        {
            id: "1",
            name: "Devops",
            img: require("@/assets/skills/devops.png"),
            rating: 3.5,
            years: 3,
            subskills: [
                {
                    id: "1",
                    name: "AWS Cloudformation",
                    years: 1,
                    img: require("@/assets/skills/aws.svg"),
                    rating: 4
                }, 
                {
                    id: "2",
                    name: "Docker",
                    years: 2,
                    img: require("@/assets/skills/docker.png"),
                    rating: 4
                },
                {
                    id: "3",
                    name: "Linux in general",
                    years: 3,
                    img: require("@/assets/skills/tux.svg"),
                    rating: 3
                }
            ]
        },
        {
            id: "2",
            name: "Backend",
            years: 5,
            img: require("@/assets/skills/server.png"),
            rating: 3,
            subskills: [
                {
                    id: "1",
                    name: "Symfony (PHP)",
                    years: 3,
                    img: require("@/assets/skills/symfony.png"),
                    rating: 3
                }, {
                    id: "2",
                    name: "Ktor (Kotlin)",
                    years: 2,
                    img: require("@/assets/skills/ktor.png"),
                    rating: 4
                }, {
                    id: "3",
                    name: "Node.JS/Typescript",
                    years: 4,
                    img: require("@/assets/skills/nodets.png"),
                    rating: 4
                }
            ]
        },
        {
            id: "3",
            name: "Frontend",
            years: 2,
            rating: 2,
            img: require("@/assets/skills/frontend.svg"),
            subskills: [
                {
                    id: "1",
                    name: "Vue.js",
                    years: 2,
                    rating: 3,
                    img: require("@/assets/skills/vue.png")
                },
                {
                    id: "2",
                    name: "React.js",
                    years: 1,
                    rating: 2,
                    img: require("@/assets/skills/react.png")
                },
                {
                    id: "3",
                    name: "Bootstrap",
                    years: 2,
                    rating: 3,
                    img: require("@/assets/skills/bootstrap.png")
                }
            ]
        },
        {
            id: "3",
            name: "Mobile",
            years: 2.5,
            rating: 3,
            img: require("@/assets/skills/mobile.png"),
            subskills: [
                {
                    id: "1",
                    name: "Android",
                    years: 3,
                    rating: 3,
                    img: require("@/assets/skills/android.png")
                },
                {
                    id: "2",
                    name: "iOS",
                    years: 2,
                    rating: 2.5,
                    img: require("@/assets/skills/apple.png")
                }
            ]
        },
        {
            id: "4",
            name: "Databases",
            years: 4,
            rating: 3,
            img: require("@/assets/skills/database.png"),
            subskills: [
                {
                    id: "1",
                    name: "PostgresSQL",
                    years: 2,
                    rating: 3,
                    img: require("@/assets/skills/postgres.svg")
                },
                {
                    id: "2",
                    name: "Mysql",
                    years: 4,
                    rating: 3,
                    img: require("@/assets/skills/mysql.png")
                }
            ]
        },
        {
            id: "5",
            name: "Softskills",
            years: -1,
            rating: 4,
            img: require("@/assets/skills/person.png"),
            subskills: [
                {
                    id: "1",
                    name: "Mentoring",
                    years: 2,
                    rating: 4,
                    img: require("@/assets/skills/mentoring.png")
                },
                {
                    id: "2",
                    name: "Teamplayer",
                    years: 5,
                    rating: 5,
                    img: require("@/assets/skills/team.png")
                }, {
                    id: "3",
                    name: "Documentation",
                    years: 3,
                    rating: 4,
                    img: require("@/assets/skills/documentation.png")
                }
            ]
        }
    ];
}