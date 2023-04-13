import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity('individuals')
export class Individual {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  cpf: string;

  @Column()
  name: string;

  @Column()
  birthDate: Date;

  @Column()
  gender: number;

  @JoinColumn({ name: 'user_id' })
  @OneToOne(() => User)
  user?: User;

  @Column({ name: 'user_id' })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
