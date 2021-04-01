import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import FreelancerDto from '../dto/freelancer.dto';
import WithdrawDto from '../dto/withdraw.dto';
import { FreelancersService } from './freelancers.service';

@Controller('freelancers')
export class FreelancersController {
  constructor(private readonly freelancersService: FreelancersService) {}
  @Post()
  insertFreelancer(@Body() freelancer: FreelancerDto) {
    return this.freelancersService.insertFreelancer(freelancer);
  }

  @Get()
  getFreelancers() {
    return this.freelancersService.getFreelancers();
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Freelancer Id' })
  @Get(':id')
  getFreelancer(@Param('id') id: number) {
    return this.freelancersService.getFreelancer(id);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Freelancer Id' })
  @Delete(':id')
  deleteFreelancer(@Param('id') id: number) {
    return this.freelancersService.deleteFreelancer(id);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Freelancer Id' })
  @Put(':id')
  updateFreelancer(@Param('id') id: number, @Body() freelancer: FreelancerDto) {
    return this.freelancersService.updateFreelancer(id, freelancer);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post(':id/withdraws')
  insertWithdraw(@Param('id') id: number, @Body() withdraw: WithdrawDto) {
    this.freelancersService.checkCorrespondingIds(id, withdraw.freelancerId);

    return this.freelancersService.insertWithdraw(id, withdraw);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Freelancer Id' })
  @Get(':id/withdraws')
  getWithdraws(@Param('id') id: number) {
    return this.freelancersService.getWithdraws(id);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Id' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get(':id/withdraws/:wid')
  getWithdraw(@Param('id') id: number, @Param('wid') wid: number) {
    return this.freelancersService.getWithdraw(id, wid);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Id' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete(':id/withdraws/:wid')
  deleteWithdraw(@Param('id') id: number, @Param('wid') wid: number) {
    return this.freelancersService.deleteWithdraw(id, wid);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Id' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Put(':id/withdraws/:wid')
  updateWithdraw(
    @Param('id') id: number,
    @Param('wid') wid: number,
    @Body() withdraw: WithdrawDto,
  ) {
    this.freelancersService.checkCorrespondingIds(id, withdraw.freelancerId);

    return this.freelancersService.updateWithdraw(id, wid, withdraw);
  }
}
