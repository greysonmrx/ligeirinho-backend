import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import Delivery from './Delivery';

@Entity('delivery_problems')
class Problem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  delivery_id: string;

  @Column()
  description: string;

  @OneToOne(() => Delivery)
  @JoinColumn({ name: 'delivery_id' })
  delivery: Delivery;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Problem;
