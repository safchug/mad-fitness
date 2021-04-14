import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { mailService } from '../config/configDi';
import { MAIL_SERVICE } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        secure: false,
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER || 'fitness.addmin@gmail.com',
          pass: process.env.MAIL_PASSWORD || 'Red12345!',
        },
      },
      defaults: {
        from:
          `"No Reply" <${process.env.MAIL_USER}>` ||
          `"No Reply" <fitness.addmin@gmail.com>`,
      },
      template: {
        dir: 'src/config/mail/invite/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [mailService],
  exports: [MAIL_SERVICE],
})
export class MailModule {}
