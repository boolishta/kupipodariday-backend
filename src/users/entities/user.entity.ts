import { Wish } from './../../wishes/entities/wish.entity';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  @Length(2, 30)
  @IsNotEmpty()
  username: string;

  @Column({
    type: 'varchar',
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 200)
  about: string;

  @Column({
    type: 'varchar',
    default: 'https://i.pravatar.cc/300',
  })
  avatar: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @Column()
  offers: string;

  @Column()
  wishlists: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
