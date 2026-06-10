import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdateClaimStatusDto {
  @IsNotEmpty({ message: 'Status tidak boleh kosong' })
  @IsString({ message: 'Status harus berupa string' })
  @IsIn(['Pending', 'Approved', 'Rejected'], {
    message: 'Status harus berupa salah satu dari: Pending, Approved, Rejected',
  })
  status: string;
}
