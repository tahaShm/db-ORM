import { ApiProperty } from '@nestjs/swagger';

export default class TicketDto {
  @ApiProperty()
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
