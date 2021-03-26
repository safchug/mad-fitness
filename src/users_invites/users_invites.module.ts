import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersInvitesEntity } from './entity/users_invites.entity';
import { UsersInvitesService } from './users-invites.service';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersInvitesEntity]),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1w' },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: process.env.MAIL_USER,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [UsersInvitesService],
  exports: [TypeOrmModule],
})
export class UsersInvitesModule {}
