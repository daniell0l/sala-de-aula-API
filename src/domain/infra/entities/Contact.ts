import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Individual } from './Individual';

export enum ContactTypes {
  TELEPHONE = 1,
  CELLPHONE = 2,
}

@Entity('contacts')
class Contact {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  info: string;

  @Column()
  type: ContactTypes;

  @JoinColumn({ name: 'individual_id' })
  @ManyToOne(() => Individual, individual => individual.id)
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

export { Contact };
