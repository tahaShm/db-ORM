import { Module } from '@nestjs/common';
import { JobseekersController } from './jobseekers.controller';
import { JobseekersService } from './jobseekers.service';
import { FreelancersModule } from './freelancers/freelancers.module';
import { EmployersModule } from './employers/employers.module';
import FreelancerEntity from 'src/db/freelancer.entity';
import EmployerEntity from 'src/db/employer.entity';
import OrderEntity from 'src/db/order.entity';
import TicketEntity from 'src/db/ticket.entity';
import WithdrawEntity from 'src/db/withdraw.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [JobseekersController],
  providers: [JobseekersService],
  imports: [
    FreelancersModule,
    EmployersModule,

    TypeOrmModule.forFeature([
      FreelancerEntity,
      EmployerEntity,
      OrderEntity,
      TicketEntity,
      WithdrawEntity,
    ]),

    TypeOrmModule.forRoot(),
  ],
})
export class JobseekersModule {}
