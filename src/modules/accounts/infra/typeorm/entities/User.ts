import { v4 as uuidv4 } from "uuid";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { ICreateUserDto } from "@modules/accounts/repositories/dto/ICreateUserDto";

@Entity("users")
export class User implements ICreateUserDto {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  driver_license: string;
  @Column()
  avatar: string;
  @Column()
  is_admin: boolean;
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
