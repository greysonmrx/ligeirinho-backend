import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import File from './File';
import Deliveryman from './DeliveryMan';
import Recipient from './Recipient';

@Entity('deliveries')
class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product: string;

  @OneToOne(() => Recipient)
  @JoinColumn({ name: 'recipient_id' })
  recipient: File;

  @Column()
  recipient_id: string;

  @OneToOne(() => Deliveryman)
  @JoinColumn({ name: 'deliveryman_id' })
  deliveryman: Delivery;

  @Column()
  deliveryman_id: string;

  @OneToOne(() => File)
  @JoinColumn({ name: 'signature_id' })
  signature: File;

  @Column()
  signature_id: string;

  @Column()
  status: string;

  @Column('timestamp')
  canceled_at: Date;

  @Column('timestamp')
  start_date: Date;

  @Column('timestamp')
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Delivery;
