import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTitleDto {
  @Transform(
    ({ value }) => (typeof value === 'string' ? value.trim() : value) as string,
  )
  @IsString()
  @IsNotEmpty()
  title: string;
}
