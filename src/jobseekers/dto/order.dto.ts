import { ApiProperty } from '@nestjs/swagger';

export default class OrderDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly descText: string;

  @ApiProperty()
  readonly size: number;

  @ApiProperty()
  readonly neededSkills: string;

  @ApiProperty()
  readonly type: string;

  @ApiProperty()
  readonly dueDate: string;

  @ApiProperty()
  readonly area: string;

  @ApiProperty()
  readonly minGuarantee: number;

  @ApiProperty()
  readonly descFile: string;

  @ApiProperty({ description: 'Optional' })
  readonly employerId: number;
}
