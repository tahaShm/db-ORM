import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrderEntity from './order.entity';
import TicketEntity from './ticket.entity';

@Entity()
export default class EmployerEntity extends BaseEntity {
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

  @OneToMany((type) => OrderEntity, (order) => order.employer)
  orders: OrderEntity[];

  @OneToMany((type) => TicketEntity, (ticket) => ticket.employer)
  tickets: TicketEntity[];
}
