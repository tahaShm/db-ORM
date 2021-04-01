import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export default class FreelancerDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phoneNumber: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty({ description: 'url' })
  readonly image: string;

  @ApiProperty({ description: 'a,b,c' })
  readonly degrees: string;

  @ApiProperty({ description: 'a,b,c' })
  readonly experiences: string;

  @ApiProperty({ description: 'a,b,c' })
  readonly skills: string;

  @ApiProperty({ description: 'Optional' })
  readonly withdrawIds: number[];
}
