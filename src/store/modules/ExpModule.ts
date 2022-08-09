import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import SkillModel from "../../models/SkillModel";
import ExpModel from "../../models/ExpModel";

@Module
export default class ExpModule extends VuexModule {
    items : ExpModel[] = [{
        id: "1",
        name: "Cegep Sorel-Tracy",
        code: "cegep",
        title: "Software Developer (Intern)",
        description: "",
        img: require("@/assets/exp/diploma.png"),
        address: "3000 Bd de Tracy, Sorel-Tracy, QC J3R 5B9",
        position: {
            lat: 46.015027997029925,
            lng: -73.14909971534128
        },
        monthStart: "January",
        yearStart: 2019,
        monthEnd: "May",
        yearEnd: 2019 
    }, {
        id: "2",
        name: "Nexweb",
        code: "nexweb",
        img: require("@/assets/exp/nexweb.png"),
        title: "Software Developer",
        description: "",
        address: "1700 Saint-Patrick St., Montreal, QC H3K 1A7",
        position: {
            lat: 45.48510683391656,
            lng: -73.56342578465872
        },
        monthStart: "June",
        yearStart: 2019,
        monthEnd: "February",
        yearEnd: 2020
    }, {
        id: "3",
        name: "Top Menu",
        code: "topmenu",
        title: "Software Developer",
        description: "",
        img: require("@/assets/exp/topmenu.png"),
        address: "8615 Boul Saint-Laurent, Montréal QC H2P 2M9",
        position: {
            lat: 45.54167163293565,
            lng: -73.63914482880354
        },
        monthStart: "March",
        yearStart: 2020,
        monthEnd: "June",
        yearEnd: 2022
    }]
}