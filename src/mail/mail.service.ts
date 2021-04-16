import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserInvite } from './interface/user.interface';
import { inviteConfig } from '../config/mail/invite/invite.config';
import { configApp } from '../config/configApp';

export const MAIL_SERVICE = 'MAIL SERVICE';

export interface IMailService {
  sendMail(user: UserInvite, token: string);
}

@Injectable()
export class MailService implements IMailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: UserInvite, token: string) {
    const url = this.makeUrl(token);

    await this.mailerService.sendMail({
      to: user.email,
      from: inviteConfig.from,
      subject: inviteConfig.subject,
      template: inviteConfig.template, // `.hbs` extension is appended automatically
      context: { url },
    });
  }

  private makeUrl(token: string): string {
    const HOST = configApp.appHost;
    const PORT = configApp.appPort;
    const PROTOCOL = configApp.appProtocol;
    return `${PROTOCOL}://${HOST}:${PORT}/auth/confirm?token=${token}`;
  }
}
