import { ApiProperty } from '@nestjs/swagger';

export default class TicketDto {
  @ApiProperty({ description: '1xxx/xx/xx' })
  readonly creationTime: string;

  @ApiProperty()
  readonly ticketNumber: number;

  @ApiProperty()
  readonly type: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly desc: string;

  @ApiProperty({ description: 'Optional' })
  readonly employerId: number;
}
