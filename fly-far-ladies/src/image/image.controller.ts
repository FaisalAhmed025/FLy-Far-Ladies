
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Req, Res, ParseFilePipeBuilder, HttpStatus, UploadedFiles } from '@nestjs/common';
import { ImageService } from './image.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { diskStorage } from 'multer';
import { Response } from 'express';

import { join } from 'path';
import { of } from 'rxjs';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';

@Controller('images')
export class ImageController {
  constructor(@InjectRepository(Image) private imageRepo: Repository<Image>,
     private readonly imageService: ImageService) {}

  @Post('AddImage')
  @UseInterceptors(FilesInterceptor('images',20,{
    storage: diskStorage({
      destination: './Images',
      filename: (req, image, callback) => {
        // const uniqueSuffix = Date.now() + '-' +Math.round(Math.random()*1e9);
        // const ext = extname(image.originalname)
        const filename = `${image.originalname}`;
        callback(null, filename)
      }
    })

  }))
  async AddImage(@UploadedFiles(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: /(jpg|jpeg|png|gif)$/,
      })
      .addMaxSizeValidator({
        maxSize: 1024*1024*6
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      }),
  )
  files:Express.Multer.File[], @Req() req: Request, @Res() res: Response,){ 
    for(const file of files){
      const  newimage= new Image();
      newimage.filename = file.filename
      newimage.destination = file.destination;
      newimage.fieldname = file.fieldname;
      newimage.path =file.path;
      newimage.originalname =file.originalname;
      await this.imageRepo.save(newimage);
      console.log(newimage);
      
    }
    return res.status(HttpStatus.OK).send({message:"Image  Added Successfully"})
  }

  @Get('AllImage')
  findAll() {
    return this.imageService.findAll();
  }
  @Get(':Id')
  findOneById(@Param('Id') Id: number) {
    return this.imageService.findOneById(+Id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }

  @Get('coverimage/:filename')
  getFile(@Param('filename') filename, @Res() res: Response) {
    return of(res.sendFile(join(process.cwd(), 'Images/' + filename)));
   
  }

}
