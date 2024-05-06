import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  name: string;

  @Column({nullable:true})
  email: string;

  @Column({ nullable: true})
  password: string;

  @Column({ nullable: true})
  socialId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "createdBy" })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "updatedBy" })
  updatedBy: User;

  @Column({ nullable: true })
  uuidToken: string;

  @Column({ default: 0 })
  isVerified: boolean;
}

@Entity("moodStatus")
export class moodStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  mood: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "createdBy" })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "updatedBy" })
  updatedBy: User;
}
@Entity("moodUserMapping")
export class moodUserMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => moodStatus, (moodStatus) => moodStatus.id)
  @JoinColumn({ name: "moodStatusId" })
  moodStatusId: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "statusUserId" })
  statusUserId: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({nullable:true})
  notes: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "createdBy" })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "updatedBy" })
  updatedBy: User;
}