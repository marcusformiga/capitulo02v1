import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { v4 as uuidv4 } from "uuid";

@Entity("users_tokens")
export class UsersTokens {
  @PrimaryColumn()
  id: string;
  @Column()
  refresh_token: string;
  @Column()
  user_id: string;
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
  @Column()
  expires_date: Date;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
