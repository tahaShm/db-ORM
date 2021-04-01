import { ApiProperty } from '@nestjs/swagger';

export default class WithdrawDto {
  @ApiProperty()
  readonly withdrawTime: string;

  @ApiProperty()
  readonly wNum: number;

  @ApiProperty()
  readonly amount: number;

  @ApiProperty()
  readonly status: string;

  @ApiProperty({ description: 'Optional' })
  readonly freelancerId: number;
}
