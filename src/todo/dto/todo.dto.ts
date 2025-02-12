import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  progressStatus: number;

  @IsString()
  @IsNotEmpty()
  tag: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
