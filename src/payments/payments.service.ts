import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PaymentsService {
  constructor(public readonly dbService: DatabaseService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const { userId, serviceId, amount, paymentMethod } = createPaymentDto;
    const query = 'SELECT * FROM process_payment($1, $2, $3, $4)';
    const values = [userId, serviceId, amount, paymentMethod];
    const result = await this.dbService.query(query, values);
    return result.rows;
  }

  async findAll() {
    const result = await this.dbService.query('SELECT * FROM payment');
    return result.rows;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
