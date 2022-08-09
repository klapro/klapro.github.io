import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    'en': {
        "titlePitch": "I am the Software Developer that you need!",
        "emailBtn": "Send me an email",
        "workTitle": "Software Developer",
        "titleDesc": "I can do it and I have been doing it for many years now!",
        "resumeTitle": "Check my resume",
        "skillTitle": "My skills",
        "employmentTitle": "My journey",
        "contactTitle": "Contact me",
        "linkedinTitle": "My Linkedin",
        "scrolldownText": "Looking for jobs !",
        "expCegepTitle": "Computer Science Degree",
        "expCegepDate": "August 2016-June 2019",
        "expCegepSubtitle": "Sorel-Tracy's CEGEP",
        "expCegepText": "I learned Web & Mobile development during my years at CEGEP. <br> <br> In my experience, I have worked on countless projects. For my internship I worked on an app to help youth finding employment in partnership with CJE of Monteregie",
        "expNexwebTitle": "Backend",
        "expNexwebText": "My first steps in the metropolitean area. <br><br> I used to work on adding features on a PCI DSS compliant application. <br><br> Also working on an optimizing a Unity game to work on browser & mobile.",
        "expNexwebDate": "June 2019-February 2020",
        "expTopmenuDate": "March 2020-June 2022",
        "expTopmenuTitle": "Backend, Devops, Mobile",
        "expTopmenuText": "I push my limits at Topmenu. <br><br> I am assigned on setting the whole infrastructure from the ground on AWS Cloudformation. I also develop bunch of backend and devops services in the aid of the comparator service. <br> <br> I also worked on the mobile application for the company. ",
        "skillDescription": "Description",
        "skillOverall": "Overall rating",
        "skillRating": "Rating",
        "skillDevopsDescription": "Everything related to the deployments of applications with Docker, AWS, etc.",
        "skillBackendDescription": "Everything related to backend development of applications, making microservices, CLI tools, installers, etc.",
        "skillFrontendDescription": "Everything related to frontend development, designing layout with AdobeXD, using frontend framework, etc.",
        "skillMobileDescription": "Everything related to mobile development. I mainly worked with native Android & iOS.",
        "skillDatabasesDescription": "Everything related to the conception of databases and usage of diverses databases environments to their design, etc.",
        "skillSoftskillsDescription": "Everything related to social skills, work environment professional relationships, working with a team, essential elements often forgotten by developer",
        "closeBtn": "Close",
        "contactSubtitle": "Send me a message",
        "contactName": "Your name",
        "contactEmail": "Your email",
        "contactMessage": "Your message",
        "contactSend": "Send",
        "contactReason": "What is the reason for you contacting me ?",
        "contactReasonJob": "For a job offer",
        "contactReasonContract": "Offer a contract",
        "contactReasonMentor": "Would like some mentoring",
        "contactReasonOther": "Other reasons"
    },
    'fr': {
        "titlePitch": "Je suis le Développeur Logiciel dont vous avez besoin!",
        "emailBtn": "Envoyez moi un courriel",
        "workTitle": "Développeur Logiciel",
        "titleDesc": "Je peux en faire et, ça fait des années que j'en fait!",
        "resumeTitle": "Regardez mon cv",
        "skillTitle": "Mes compétences",
        "employmentTitle": "Mon périple",
        "contactTitle": "Contactez moi",
        "linkedinTitle": "Mon Linkedin",
        "scrolldownText": "Je cherche une job !",
        "expCegepTitle": "Technique Informatique",
        "expCegepDate": "Août 2016-Juin 2019",
        "expCegepSubtitle": "CEGEP de Sorel-Tracy",
        "expCegepText": "J'apprend le developpement Web & Mobile (Android & iOS) durant mes années au CEGEP. <br> <br> Lors de mon parcours, j'ai pu travaillé sur de nombrables projets. Lors de mon stage, j'ai travaillé sur un projet d'application de recherche d'emploi en partenariat avec les Carrefours Jeunesses Emplois de la Montéregie.",
        "expNexwebTitle": "Backend",
        "expNexwebText": "Mes premiers pas dans la métropole seul. <br><br>  Je travaillais sur l'ajout de fonctionnalités sur une application compliante aux normes PCI-DSS <br><br> Puis sur l'optimisation d'un jeu Unity pour qu'il soit fonctionnel pour navigateur & mobile. ",
        "expNexwebDate": "Juin 2019-Février 2020",
        "expTopmenuDate": "Mars 2020-Juin 2022",
        "expTopmenuTitle": "Backend, Devops, Mobile",
        "expTopmenuText": "Je repousse mes limites chez Topmenu <br><br> Je suis assigné à l'infrastructure avec AWS Cloudformation. Je développe des tas d'outils et de services backend pour aider le comparateur de restaurants. <br> <br> J'ai meme fait l'application mobile pour la compagnie",
        "skillDescription": "Description",
        "skillOverall": "Note Global",
        "skillRating": "Note",
        "skillDevopsDescription": "Tout ce qui est relié au deploiement d'application avec Docker, AWS, gestion de serveurs et de ressources, etc.",
        "skillBackendDescription": "Tout ce qui est relié au developpement backend d'applications, la conception de microservices, d'outil de CLI, d'installers, etc.",
        "skillFrontendDescription": "Tout ce qui est relié au developpement frontend, le design de layout avec AdobeXD, utilisation de framework frontend, etc.",
        "skillMobileDescription" : "Tout ce qui est relié au developpement d'application mobile. Je fais principalement du Android & iOS Natif.",
        "skillDatabasesDescription": "Tout ce qui est relié au developpement à la conception de bases de données, l'utilisation d'environments variées et de leur design, etc.",
        "skillSoftskillsDescription": "Tout ce qui est relié au social skills, les relations de travail, travailler en equipe, des elements essentiels souvent oubliés par les développeurs",
        "closeBtn": "Fermer",
        "contactSubtitle": "Envoyez moi un message",
        "contactName": "Votre nom",
        "contactEmail": "Votre courriel",
        "contactMessage": "Votre message",
        "contactSend": "Envoyer",
        "contactReason": "Pourquoi me contactez-vous ?",
        "contactReasonJob": "Pour une offre d'emploi",
        "contactReasonContract": "Un offre de contract",
        "contactReasonMentor": "Besoin de mentorat",
        "contactReasonOther": "Autre"
    } 
};


export default new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'fr', // set fallback locale
    messages, // set locale messages
});