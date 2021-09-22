import { IMailProvider } from "./IMailProvider";

export class MailProviderFake implements IMailProvider {
  private message: any[] = [];
  public async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}
