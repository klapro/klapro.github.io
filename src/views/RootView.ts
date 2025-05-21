import Vue from "vue";

export default class RootView extends Vue {

    sleep(ms: number): Promise<any> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    goToContact() {
        (this.$refs.sectionContact as any).scrollIntoViewPromise({ behavior: "smooth" }).then(() => {
          this.$store.commit("global/setSection", 2);
        })
    }
  
    goToGithub() {
        window.open('https://github.com/klapro', '_blank');
    }
    
    goToLinkedin() {
        window.open('https://www.linkedin.com/in/kevin-larocque-a6658b130/', '_blank');
    }

    goToResume() {
        window.open('https://docs.google.com/document/d/1NWw1jlBe_j6IlpbL1mFjFpdQkcR_6v6V/edit?usp=sharing&ouid=115149250920451854386&rtpof=true&sd=true', '_blank');
    }
}