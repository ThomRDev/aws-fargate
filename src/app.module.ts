import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
import { DatabaseModule } from './database/database.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [DatabaseModule, PaymentsModule, ServicesModule],
  controllers: [],
  providers: []
})
export class AppModule {}
