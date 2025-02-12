import { Injectable } from '@nestjs/common';
import sanitize from 'sanitize-html';

@Injectable()
export class SanitizeService {
  sanitizeString(value: string): string {
    return sanitize(value);
  }

  sanitizeArray(value: string[]): string[] {
    return value.map((val) => sanitize(val));
  }

  sanitizeObject(value: object): object {
    const objectSanitized = {};

    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        if (typeof value[key] === 'string') {
          objectSanitized[key] = this.sanitizeString(value[key]);
        }

        if (typeof value[key] === 'object') {
          objectSanitized[key] = this.sanitizeObject(value[key]);
        }

        if (typeof value[key] === 'number') {
          objectSanitized[key] = value[key];
        }
      }
    }

    return objectSanitized;
  }
}
