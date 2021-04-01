import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import EmployerEntity from './employer.entity';

@Entity()
export default class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  descText: string;

  @Column()
  size: number;

  @Column({ length: 500 })
  neededSkills: string;

  @Column({ length: 500 })
  type: string;

  @Column({ length: 10 })
  dueDate: string;

  @Column({ length: 500 })
  area: string;

  @Column()
  minGuarantee: number;

  @Column({ length: 500 })
  descFile: string;

  @ManyToOne((type) => EmployerEntity, (employer) => employer.orders)
  employer: EmployerEntity;
}
