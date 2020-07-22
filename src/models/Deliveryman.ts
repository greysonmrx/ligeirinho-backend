import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import File from './File';

@Entity('deliverymen')
class DeliveryMan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToOne(() => File)
  @JoinColumn({ name: 'avatar_id' })
  avatar: File;

  @Column()
  avatar_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default DeliveryMan;
