import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

export const MAIL_SERVICE = 'EMAIL SERVICE';

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
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Mad fitness. Please continue your registration!',
      template: 'invite', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
        url,
      },
    });
  }

  private makeUrl(token: string): string {
    const HOST = process.env.HOST || '127.0.0.1';
    const PORT = process.env.PORT || '3000';
    const PROTOCOL = process.env.INVITE_PROTOCOL || 'http';
    return `${PROTOCOL}://${HOST}:${PORT}/auth/confirm?token=${token}`;
  }
}
