import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios';
import * as sharp from 'sharp';

@Controller()
export class AppController {
  @Get('process-image')
  async processImage(
    @Query('url') url: string,
    @Query('width') width?: string,
    @Query('height') height?: string,
    @Query('quality') quality?: string,
  ): Promise<any> {
    if (!url) {
      return { error: 'URL de la imagen es obligatorio' };
    }

    try {
      // Descargar la imagen
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data);

      // Procesar la imagen
      let processedImage = sharp(imageBuffer);

      if (width || height) {
        processedImage = processedImage.resize({
          width: width ? parseInt(width, 10) : null,
          height: height ? parseInt(height, 10) : null,
        });
      }

      if (quality) {
        processedImage = processedImage.jpeg({
          quality: parseInt(quality, 10),
        });
      }

      const outputBuffer = await processedImage.toBuffer();

      // Devuelve la imagen en base64
      return {
        contentType: 'image/jpeg',
        data: outputBuffer.toString('base64'),
      };
    } catch (error) {
      console.error(error);
      return { error: 'Error procesando la imagen' };
    }
  }
}
