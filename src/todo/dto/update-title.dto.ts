import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTitleDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
