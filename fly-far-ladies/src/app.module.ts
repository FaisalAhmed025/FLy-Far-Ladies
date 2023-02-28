
import { CartImage } from './tourpackages/entities/cartimage.entity';
import { AlbumImage } from './tourpackages/entities/albumimage.entity';
import { refundpolicy } from './tourpackages/entities/refundpolicy.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourpackagesModule } from './tourpackages/tourpackages.module';
import { ImageModule } from './image/image.module';
import { tourpackage } from './tourpackages/entities/tourpackage.entity';
import { packageincluded } from './tourpackages/entities/PackageInclude.entity';
import { packageinclusion } from './tourpackages/entities/packageInclusion.entitry';
import { tourpackageplan } from './tourpackages/entities/tourpackageplan.entity';
import { packageexcluions } from './tourpackages/entities/packageexclsuions.entity';
import { packagehighlight } from './tourpackages/entities/packagehighlight.entity';
import { PolicyModule } from './bookingPolicy/policy.module';
import { BookingPolicy } from './bookingPolicy/entities/policy.entity';
import { Travelpackage } from './travelpackage/entities/travelpackage.entity';
import { TravelpackageModule } from './travelpackage/travelpackage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'flyfar-ladies',
      autoLoadEntities:false,
      entities: [
        tourpackage,
        AlbumImage,
        CartImage,
        packageexcluions,
        packageincluded,
        packageinclusion,
        tourpackageplan,
        packagehighlight,
        BookingPolicy,
        refundpolicy,
        Travelpackage,
      ],
      synchronize:true,
    }),
    TourpackagesModule,
    UsersModule,
    ImageModule,
    PolicyModule,
    TravelpackageModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
