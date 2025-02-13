import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsNumber()
  @IsNotEmpty()
  progressStatus: number;

  @IsString()
  @IsNotEmpty()
  tag: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
