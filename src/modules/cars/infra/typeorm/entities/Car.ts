import { ICreateCarDto } from "@modules/cars/dto/ICreateCarDto";
import { v4 as uuidv4 } from "uuid";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
export class Car implements ICreateCarDto {
  @PrimaryColumn()
  id: string;
  @Column()
  dayly_rate: number;
  @Column()
  is_avaliable: boolean;
  @Column()
  brand: string;
  @JoinColumn({ name: "category_id" })
  @ManyToOne(() => Category)
  category: Category;
  @Column()
  category_id: string;
  @Column()
  name: string;
  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    joinColumns: [{ name: "cars_id" }],
    inverseJoinColumns: [{ name: "specifications_id" }],
  })
  specifications: Specification[];
  @Column()
  description: string;
  @Column()
  license_plate: string;
  @Column()
  fine_amount: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.is_avaliable = true;
    }
  }
}
