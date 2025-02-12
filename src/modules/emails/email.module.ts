import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ContactSchemaFactory } from './schema/emails.schema';
import { EmailService } from './email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'emails',
        schema: ContactSchemaFactory,
      },
    ]),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
