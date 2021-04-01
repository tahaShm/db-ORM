import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import FreelancerEntity from './freelancer.entity';

@Entity()
export default class WithdrawEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  withdrawTime: string;

  @Column()
  wNum: number;

  @Column()
  amount: number;

  @Column({ length: 50 })
  status: string;

  @ManyToOne((type) => FreelancerEntity, (freelancer) => freelancer.withdraws)
  freelancer: FreelancerEntity;
}
