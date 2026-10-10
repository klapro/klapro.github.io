import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    'en': {
        "scrollText": "Scroll Down",
        "pitchExpertise": "Expertise in Mobile, Web, Cloud since 2019",
        "titlePitch": "I can code anything you need from A to Z!",
        "emailBtn": "Send me an email",
        "workTitle": "Places I’ve Worked",
        "titleDesc": "I can do it and I have been doing it for many years now!",
        "resumeTitle": "Check my resume",
        "skillTitle": "My skills",
        "employmentTitle": "My journey",
        "githubTitle": "My Github",
        "contactTitle": "Contact me",
        "linkedinTitle": "My Linkedin",
        "scrolldownText": "Open for hire !",
        "closeBtn": "Close",
        "contactSubtitle": "Send me a message",
        "contactName": "Your name",
        "contactEmail": "Your email",
        "contactMessage": "Your message",
        "contactReasonRuleRequired": "Reason is required",
        "contactSend": "Send",
        "contactNameRuleRequired": "Name is required.",
        "contactNameRuleMin": "Name must be 10 characters min",
        "contactEmailRuleRequired": "Email is required",
        "contactEmailRuleValid": "Email must follow valid format",
        "contactMessageRuleRequired": "Message is required",
        "contactMessageRuleMin": "Message must be 3 characters min",
        "contactMessageSentTitle": "Message Sent",
        "contactMessageSentText": "Your message was sent with success!",
        "contactReason": "What is the reason for you contacting me ?",
        "contactReasonJob": "For a job offer",
        "contactReasonContract": "Offer a contract",
        "contactReasonMentor": "Would like some mentoring",
        "contactReasonOther": "Other reasons",
         "months": ["January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December"],
    "exp": { "present": "Present", "viewMore": "Read more" }
        
    },
    'fr': {
        "pitchExpertise": "Expertise en Mobile, Web & Cloud depuis 2019",
        "titlePitch": "Je suis le Développeur Logiciel dont vous avez besoin!",
        "emailBtn": "Envoyez moi un courriel",
        "workTitle": "Mon parcours",
        "titleDesc": "Je peux en faire et, ça fait des années que j'en fait!",
        "resumeTitle": "Regardez mon cv",
        "skillTitle": "Mes compétences",
        "employmentTitle": "Mon périple",
        "contactTitle": "Contactez moi",
        "linkedinTitle": "Mon Linkedin",
        "scrolldownText": "Dispo pour entrevue!",
        "expCegepTitle": "Technique Informatique",
        "skillDescription": "Description",
        "skillOverall": "Note Global",
        "skillRating": "Note",
        "closeBtn": "Fermer",
        "contactSubtitle": "Envoyez moi un message",
        "contactName": "Votre nom",
        "contactEmail": "Votre courriel",
        "contactMessage": "Votre message",
        "contactSend": "Envoyer",
        "contactNameRuleRequired": "Nom est requis",
        "contactNameRuleMin": "Nom doit etre de 10 caracteres min",
        "contactEmailRuleRequired": "Email est requis",
        "contactEmailRuleValid": "Email doit suivre un format standard",
        "contactMessageRuleRequired": "Message est requis",
        "contactMessageRuleMin": "Message doit etre de 3 caracteres min",
        "contactMessageSentTitle": "Message Envoyé",
        "contactMessageSentText": "Votre message a été envoyé avec succès!",
        "contactReason": "Pourquoi me contactez-vous ?",
        "contactReasonJob": "Pour une offre d'emploi",
        "contactReasonContract": "Un offre de contract",
        "contactReasonMentor": "Besoin de mentorat",
        "contactReasonOther": "Autre",
        "githubTitle": "Mon Github",
        "months": ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
               "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    "exp": { "present": "Présent", "viewMore": "En savoir plus" }
    } 
};


export default new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'fr', // set fallback locale
    messages, // set locale messages
});