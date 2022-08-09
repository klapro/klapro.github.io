import axios from "@/api";
import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";

@Module
export default class LoginModule extends VuexModule {
    logged = false;

    get isLoggedIn(): Boolean {
        return this.logged;
    }

    @Action
    login(loginObject: any): Promise<Boolean> {
        return axios({
            method: 'POST',
            url: '/login',
            data: loginObject
        }).then((response) => {
            if (response.data.status) {
                this.setLogIn();
            }
            return response.data.status;
        });
    }  

    @Mutation
    setLogIn() {
        this.logged = true;
    }
}