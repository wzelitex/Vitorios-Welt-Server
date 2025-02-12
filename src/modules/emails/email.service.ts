import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactSchema } from './schema/emails.schema';
import sgMail from '@sendgrid/mail';
import { ISendEmail } from './interface/interface.emails';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel('emails') private readonly contactModel: Model<ContactSchema>,
  ) {
    sgMail.setApiKey('ndva tqvc ydqr ljhu');
  }

  private async createDocumentsEmails(data: ISendEmail[]) {
    return await this.contactModel.insertMany(data);
  }

  async sendEmails(data: ISendEmail[]) {
    await this.createDocumentsEmails(data);
    return await sgMail.send(data);
  }
}
