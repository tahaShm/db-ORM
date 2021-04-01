import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import WithdrawEntity from './withdraw.entity';

@Entity()
export default class FreelancerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 11 })
  phoneNumber: string;

  @Column({ length: 50 })
  password: string;

  @Column({ length: 500 })
  image: string;

  @Column()
  degrees: string;

  @Column({ length: 500 })
  experiences: string;

  @Column({ length: 500 })
  skills: string;

  @OneToMany((type) => WithdrawEntity, (withdraw) => withdraw.freelancer)
  withdraws: WithdrawEntity[];
}
