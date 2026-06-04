import nodemailer, { TransportOptions } from "nodemailer";
import { SMTPConfig } from "../config/app-env";

class EmailService{
    #transport;

    constructor() {
        try{
                const config = {
                host: SMTPConfig.host,
                port: SMTPConfig.port,
                service: "gmail",
                auth: {
                    user: SMTPConfig.user,
                    pass: SMTPConfig.password
                }
            } as TransportOptions;

            this.#transport = nodemailer.createTransport(config);
            console.log("SMTP Connected")
        } catch(exceptation){
            console.error("Error SMTP connection:", exceptation);
        }
    }

    async sendEmail (messageConfig: {
        to : string,
        subject: string,
        body : string,
    }) {
        try {
            return await this.#transport?.sendMail({
                from: SMTPConfig.from,
                to: messageConfig.to,
                subject: messageConfig.subject,
                html: messageConfig.body
            });

        } catch(exceptation){
            console.error(exceptation);
            throw {code: 500, message: "Error sending email...."}
        }
    }
}

export default EmailService