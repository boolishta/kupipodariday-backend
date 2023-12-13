import { User } from './../../users/entities/user.entity';
import { IsUrl, Length } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({
    type: 'int',
    precision: 100,
  })
  price: number;

  @Column({
    type: 'int',
    precision: 100,
  })
  raised: number;

  @Column()
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column()
  @Length(1, 1024)
  description: string;

  @Column()
  offers: string[];

  @Column()
  copied: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
