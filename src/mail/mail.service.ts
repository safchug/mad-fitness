import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';
import { inviteConfig } from '../config/mail/invite/invite.config';

export const MAIL_SERVICE = 'MAIL SERVICE';

export interface IMailService {
  sendMail(user: User, token: string);
}

@Injectable()
export class MailService implements IMailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: User, token: string) {
    const url = this.makeUrl(token);

    await this.mailerService.sendMail({
      to: user.email,
      from: process.env.MAIL_USER, //'"Support Team" <support@example.com>', // override default from
      subject: inviteConfig.subject,
      template: inviteConfig.template, // `.hbs` extension is appended automatically
      context: { url },
    });
  }

  private makeUrl(token: string): string {
    const HOST = inviteConfig.HOST || '127.0.0.1';
    const PORT = inviteConfig.PORT || '3000';
    const PROTOCOL = inviteConfig.PROTOCOL || 'http';
    return `${PROTOCOL}://${HOST}:${PORT}/auth/confirm?token=${token}`;
  }
}
