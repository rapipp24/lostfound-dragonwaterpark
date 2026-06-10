import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdateReportStatusDto {
  @IsNotEmpty({ message: 'Status tidak boleh kosong' })
  @IsString({ message: 'Status harus berupa string' })
  @IsIn(['Pending', 'Found', 'Claimed'], {
    message: 'Status harus berupa salah satu dari: Pending, Found, Claimed',
  })
  status: string;
}
