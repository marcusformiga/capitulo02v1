import { injectable } from "tsyringe";
import { IMailProvider } from "./IMailProvider";
import nodemailer, { Transporter } from "nodemailer";

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
        this.client = transporter;
      })
      .catch((err) => console.log(err));
  }
  public async sendMail(
    to: string,
    subject: string,
    body: string
  ): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreply@renxt.com.br>",
      subject,
      text: body,
      html: body,
    });
    console.log("Message send: %s", message.messageId);
    console.log("Preview Url: %s", nodemailer.getTestMessageUrl(message));
  }
}
