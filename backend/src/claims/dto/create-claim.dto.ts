import { IsNotEmpty, IsString, IsNumber, Matches } from 'class-validator';

export class CreateClaimDto {
  @IsNotEmpty()
  @IsString()
  claimerName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^08[0-9]{8,13}$/, {
    message: 'Nomor telepon harus diawali 08 dan berisi 10-15 digit angka',
  })
  claimerPhone: string;

  @IsNotEmpty()
  @IsNumber()
  reportId: number;
}
