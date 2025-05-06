import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'User id',
    nullable: false,
    minLength: 1
  })
  @IsString()
  public userId: string;

  @ApiProperty({
    description: 'Service id',
    nullable: false,
    minLength: 1
  })
  @IsString()
  public serviceId: string;

  @ApiProperty()
  @IsNumber({
    maxDecimalPlaces: 4
  })
  @Min(0)
  @Type(() => Number)
  public amount: number;

  @ApiProperty()
  @IsString()
  public paymentMethod: string;
}
