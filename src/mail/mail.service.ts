import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMail } from './interface/sendMail.interface';

export const MAIL_SERVICE = 'MAIL SERVICE';

export interface IMailService {
  sendMail(mail: SendMail);
}

@Injectable()
export class MailService implements IMailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(mail: SendMail) {
    await this.mailerService.sendMail({
      to: mail.to,
      from: mail.from,
      subject: mail.subject,
      template: mail.template, // `.hbs` extension is appended automatically
      context: { url: mail.url },
    });
  }
}
