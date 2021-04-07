import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import User from './user.interface';

export const EMAIL_SERVICE = 'EMAIL SERVICE';

export interface IEmailService {
  sendInvite(user: User, token: string);
}

@Injectable()
export class EmailService implements IEmailService {
  constructor(private mailService: MailerService) {}

  sendInvite(user: User, token: string) {
    const url = this.makeUrl(token);

    return this.mailService.sendMail({
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
    const HOST = process.env.HOST;
    const PORT = process.env.PORT;
    const PROTOCOL = process.env.INVITE_PROTOCOL || 'http';
    return `${PROTOCOL}://${HOST}:${PORT}/auth/confirm?token=${token}`;
  }
}
