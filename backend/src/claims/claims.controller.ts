import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@Controller('claims')
@UseGuards(AuthGuard('jwt'))
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  create(@Body() createClaimDto: CreateClaimDto) {
    return this.claimsService.create(createClaimDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.claimsService.findAll(+page, +limit);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard) //admin only
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.claimsService.updateStatus(+id, status);
  }
}
