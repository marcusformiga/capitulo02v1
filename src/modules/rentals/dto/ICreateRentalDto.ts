export interface ICreateRentalDto {
  id?: string;
  car_id: string;
  user_id: string;
  return_date: Date;
  start_date?: Date;
  end_date?: Date;
  total?: number;
  created_at?: Date;
  updated_at?: Date;
}
