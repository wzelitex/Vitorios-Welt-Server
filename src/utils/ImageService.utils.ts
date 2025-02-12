import { Injectable, BadRequestException } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class ImageService {
  private readonly storage: Storage;
  private readonly bucketName: string;

  constructor() {
    this.storage = new Storage({
      keyFilename:
        'C:/Company/Credenciales_google_cloud/crendentials-account-storage-vitorioswelt.json',
    });
    this.bucketName = 'vitorioswelt_storage';
  }

  async uploadFile(body: Express.Multer.File): Promise<string> {
    const { buffer, originalname, mimetype } = body;

    const fileName = `${Date.now()}-${originalname}`;
    const bucket = this.storage.bucket(this.bucketName);

    try {
      const blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream({
        resumable: true,
        metadata: {
          contentType: mimetype,
        },
      });

      blobStream.end(buffer);
      await new Promise((resolve, reject) => {
        blobStream.on('finish', resolve);
        blobStream.on('error', reject);
      });

      await blob.makePrivate();
      return `https://storage.cloud.google.com/${this.bucketName}/${fileName}`;
    } catch (error) {
      console.error('Error al subir el archivo: ', error);
      throw new BadRequestException(`Error al subir el archivo: `);
    }
  }

  async deleteFile(fileUrl: string) {
    if (!fileUrl) return;

    const fileName = this.bucketName.split('/').pop();
    await this.storage.bucket(this.bucketName).file(fileName).delete();
  }
}
