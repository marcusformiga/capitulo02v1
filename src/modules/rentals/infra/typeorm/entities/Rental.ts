import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateRentalDto } from "@modules/rentals/dto/ICreateRentalDto";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
@Entity("rentals")
export class Rental implements ICreateRentalDto {
  @PrimaryColumn()
  id: string;
  @Column()
  car_id: string;
  @Column()
  user_id: string;
  @Column()
  start_date: Date;
  @Column()
  end_date: Date;
  @Column()
  return_date: Date;
  @ManyToOne(() => Car)
  @JoinColumn({ name: "car_id" })
  car: Car;
  @Column()
  total: number;
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
