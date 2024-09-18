import { Injectable } from '@nestjs/common';
const streamifier = require('streamifier');
import { CloudinaryResponse } from './cloudinary.response';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
 async uploadFile(
    file: Express.Multer.File,
    folderName: string,
    imageName: string,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folderName,
          public_id: imageName,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      if (file?.buffer) {
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      }
    });
  }
}
