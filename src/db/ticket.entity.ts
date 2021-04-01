import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import EmployerEntity from './employer.entity';

@Entity()
export default class TicketEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  creationTime: string;

  @Column()
  ticketNumber: number;

  @Column({ length: 500 })
  type: string;

  @Column({ length: 500 })
  title: string;

  @Column({ length: 500 })
  desc: string;

  @ManyToOne((type) => EmployerEntity, (employer) => employer.tickets)
  employer: EmployerEntity;
}
