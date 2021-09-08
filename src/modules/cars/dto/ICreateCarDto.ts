import { Specification } from "../infra/typeorm/entities/Specification";

export interface ICreateCarDto {
  id?: string;
  name: string;
  description: string;
  dayly_rate: number;
  is_avaliable?: boolean;
  license_plate: string;
  fine_amount: number;
  specifications?: Specification[];
  brand: string;
  category_id: string;
  created_at?: Date;
  updated_at?: Date;
}
