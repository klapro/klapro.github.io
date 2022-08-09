<template>
    <div id="main" class="d-flex justify-content-center align-items-center w-100 h-100">
        <div class="w-50 bg-light p-3 rounded border-dark">
         <v-form>
            <h3> Login </h3>
            <v-alert 
                dense
                outlined
                class="mt-3 mb-0"
                v-model="error"
                type="error"> Error : Login invalid.
            </v-alert> 
            <v-text-field
                v-model="username"
                label="Username"
            ></v-text-field>

            <v-text-field
                v-model="password"
                :append-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPw ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                @click:append="showPw = !showPw"
            ></v-text-field>
            
            <div class="d-flex justify-content-end">
                <v-btn
                    color="success"
                    class="mt-3"
                    @click="validate"
                >
                    Validate
                </v-btn>
            </div>
        </v-form>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class AdminLogin extends Vue {
    showPw = false;
    username = "";
    password = "";
    error = false;

    beforeMount() {
        this.showPw = false;
        this.username = "";
        this.password = "";
        this.error = false;
    }

    validate() {
        this.$store.dispatch('LoginModule/login', {
            username: this.username,
            password: this.password
        }).then((response) => {
            if (response) {
                this.error = false;
                this.$router.push('/admin');
            } else {
                this.error = true;
            }
        })
    }
}
</script>

<style scoped>
#main {
    background: #1e88e5;
}
</style>