import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Individual } from './Individual';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @OneToOne(() => Individual, individual => individual.id)
  @JoinColumn({ name: 'individual_id' })
  individual?: Individual;

  @Column({ name: 'entity_id' })
  entityId: number;

  @Column({ name: 'individual_id' })
  individualId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
