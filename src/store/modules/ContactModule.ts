
import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import ContactModel from "@/models/ContactModel";

const WEBHOOK_URL = "https://discord.com/api/webhooks/1006623769189679265/wWo3CPDflweCbgQW_ogOjVMgjntc80gdPQn4xwE4m3dhErcQIZ3SWJSbMEC-i9QADhRH";

@Module
export default class ContactModule extends VuexModule {
    @Action
    sendDiscordNotification(contact: ContactModel) {
        let reason = "";

        switch(contact.reason) {
            case 'contactReasonJob':
                reason = "Employment Offer";
                break;
            case 'contactReasonContract':
                reason = "Contract Offer";
                break;
            case 'contactReasonMentor':
                reason = "Mentorship Offer";
                break;
            default:
                reason = "Other";
                break;
        }

        let date: string = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});

        return fetch(WEBHOOK_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: contact.name + "(" + contact.email + ")",
                    content: "**" + reason + "** [" + date + "]\n" + contact.message,
                })
        });
    }
}