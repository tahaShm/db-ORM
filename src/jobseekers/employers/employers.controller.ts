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
import EmployerDto from '../dto/employer.dto';
import OrderDto from '../dto/order.dto';
import TicketDto from '../dto/ticket.dto';
import { EmployersService } from './employers.service';

@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}
  @Post()
  insertEmployer(@Body() employer: EmployerDto) {
    return this.employersService.insertEmployer(employer);
  }

  @Get()
  getEmployers() {
    return this.employersService.getEmployers();
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Employer Id' })
  @Get(':id')
  getEmployer(@Param('id') id: number) {
    return this.employersService.getEmployer(id);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Employer Id' })
  @Delete(':id')
  deleteEmployer(@Param('id') id: number) {
    return this.employersService.deleteEmployer(id);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post(':id/orders')
  insertOrder(@Param('id') id: number, @Body() order: OrderDto) {
    this.employersService.checkCorrespondingIds(id, order.employerId);

    return this.employersService.insertOrder(id, order);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Employer Id' })
  @Get(':id/orders')
  getOrders(@Param('id') id: number) {
    return this.employersService.getOrders(id);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Id' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get(':id/orders/:oid')
  getOrder(@Param('id') id: number, @Param('oid') oid: number) {
    return this.employersService.getOrder(id, oid);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Id' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete(':id/orders/:oid')
  deleteOrder(@Param('id') id: number, @Param('oid') oid: number) {
    return this.employersService.deleteOrder(id, oid);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Id' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Put(':id/orders/:oid')
  updateOrder(
    @Param('id') id: number,
    @Param('oid') oid: number,
    @Body() order: OrderDto,
  ) {
    this.employersService.checkCorrespondingIds(id, order.employerId);

    return this.employersService.updateOrder(id, oid, order);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post(':id/tickets')
  insertTicket(@Param('id') id: number, @Body() ticket: TicketDto) {
    this.employersService.checkCorrespondingIds(id, ticket.employerId);

    return this.employersService.insertTicket(id, ticket);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Employer Id' })
  @Get(':id/tickets')
  getTickets(@Param('id') id: number) {
    return this.employersService.getTickets(id);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Id' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get(':id/tickets/:tid')
  getTicket(@Param('id') id: number, @Param('tid') tid: number) {
    return this.employersService.getTicket(id, tid);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Id' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete(':id/tickets/:tid')
  deleteTicket(@Param('id') id: number, @Param('tid') tid: number) {
    return this.employersService.deleteTicket(id, tid);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Invalid Id' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Put(':id/tickets/:tid')
  updateTicket(
    @Param('id') id: number,
    @Param('tid') tid: number,
    @Body() ticket: TicketDto,
  ) {
    this.employersService.checkCorrespondingIds(id, ticket.employerId);

    return this.employersService.updateTicket(id, tid, ticket);
  }
}
