import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassesModule } from './classes/classes.module';
import { SheduleModule } from './shedule/shedule.module';

@Module({
  imports: [ClassesModule, SheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
