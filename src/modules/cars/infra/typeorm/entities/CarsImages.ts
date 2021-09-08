import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
@Entity("cars_images")
export class CarsImages {
  @PrimaryColumn()
  id: string;
  @Column()
  car_id: string;
  @Column()
  images_car: string;
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
