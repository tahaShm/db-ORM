import { ApiProperty } from '@nestjs/swagger';

export default class EmployerDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phoneNumber: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly image: string;

  @ApiProperty({ description: 'Optional' })
  readonly orderIds: number[];

  @ApiProperty({ description: 'Optional' })
  readonly ticketIds: number[];
}
