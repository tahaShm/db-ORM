import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import EmployerEntity from 'src/db/employer.entity';
import OrderEntity from 'src/db/order.entity';
import TicketEntity from 'src/db/ticket.entity';
import EmployerDto from '../dto/employer.dto';
import OrderDto from '../dto/order.dto';
import TicketDto from '../dto/ticket.dto';

@Injectable()
export class EmployersService {
  //employers

  async insertEmployer(newEmployer: EmployerDto): Promise<EmployerEntity> {
    const { orderIds, ticketIds, ...employerInfo } = newEmployer;
    const employer = new EmployerEntity();
    Object.keys(employerInfo).forEach((key) => {
      employer[key] = employerInfo[key];
    });
    employer.orders = [];
    employer.tickets = [];

    if (orderIds) {
      for (let i = 0; i < orderIds.length; i++) {
        const order = await OrderEntity.findOne(orderIds[i]);
        employer.orders.push(order);
      }
    }
    if (ticketIds) {
      for (let i = 0; i < ticketIds.length; i++) {
        const ticket = await TicketEntity.findOne(ticketIds[i]);
        employer.tickets.push(ticket);
      }
    }

    await employer.save();
    return employer;
  }

  async getEmployers(): Promise<EmployerEntity[]> {
    return EmployerEntity.find();
  }

  async getEmployer(id: number): Promise<EmployerEntity> {
    const foundEmployer = await this.checkEmployer(id);

    return foundEmployer;
  }

  async deleteEmployer(id: number): Promise<any> {
    await this.checkEmployer(id);

    return await EmployerEntity.delete({ id });
  }

  //orders

  async insertOrder(eid: number, newOrder: OrderDto): Promise<OrderEntity> {
    await this.checkEmployer(eid);

    const { ...OrderInfo } = newOrder;
    const Order = new OrderEntity();
    Object.keys(OrderInfo).forEach((key) => {
      Order[key] = OrderInfo[key];
    });
    Order.employer = await EmployerEntity.findOne(eid);

    await Order.save();
    return Order;
  }

  async getOrders(eid: number): Promise<OrderEntity[]> {
    await this.checkEmployer(eid);

    const Employer: EmployerEntity = await EmployerEntity.findOne({
      where: { id: eid },
      relations: ['orders'],
    });
    return Employer.orders;
  }

  async getOrder(eid: number, oid: number): Promise<any> {
    await this.checkEmployer(eid);
    await this.checkOrder(oid);

    const Order: OrderEntity = await OrderEntity.findOne({
      where: { id: oid },
      relations: ['employer'],
    });
    await this.checkOrderAccessibility(Order, eid);

    const { employer, ...OrderInfo } = Order;

    if (Order.employer?.id == eid) return OrderInfo;
  }

  async deleteOrder(eid: number, oid: number): Promise<any> {
    await this.getOrder(eid, oid);

    return await OrderEntity.delete({ id: oid });
  }

  async updateOrder(
    eid: number,
    oid: number,
    curOrder: OrderDto,
  ): Promise<any> {
    await this.getOrder(eid, oid);

    const { employerId, ...OrderInfo } = curOrder;
    return OrderEntity.update({ id: oid }, OrderInfo);
  }

  //tickets

  async insertTicket(eid: number, newTicket: TicketDto): Promise<TicketEntity> {
    await this.checkEmployer(eid);

    const { ...TicketInfo } = newTicket;
    const Ticket = new TicketEntity();
    Object.keys(TicketInfo).forEach((key) => {
      Ticket[key] = TicketInfo[key];
    });
    Ticket.employer = await EmployerEntity.findOne(eid);

    await Ticket.save();
    return Ticket;
  }

  async getTickets(eid: number): Promise<TicketEntity[]> {
    await this.checkEmployer(eid);

    const Employer: EmployerEntity = await EmployerEntity.findOne({
      where: { id: eid },
      relations: ['tickets'],
    });
    return Employer.tickets;
  }

  async getTicket(eid: number, tid: number): Promise<any> {
    await this.checkEmployer(eid);
    await this.checkTicket(tid);

    const Ticket: TicketEntity = await TicketEntity.findOne({
      where: { id: tid },
      relations: ['employer'],
    });
    await this.checkTicketAccessibility(Ticket, eid);

    const { employer, ...TicketInfo } = Ticket;

    if (Ticket.employer?.id == eid) return TicketInfo;
  }

  async deleteTicket(eid: number, tid: number): Promise<any> {
    await this.getTicket(eid, tid);

    return await TicketEntity.delete({ id: tid });
  }

  async updateTicket(
    eid: number,
    tid: number,
    curTicket: TicketDto,
  ): Promise<any> {
    await this.getTicket(eid, tid);

    const { employerId, ...TicketInfo } = curTicket;
    return TicketEntity.update({ id: tid }, TicketInfo);
  }

  //utils

  async checkEmployer(id: number) {
    const foundEmployer = await EmployerEntity.findOne(id);

    if (!foundEmployer?.id) {
      throw new HttpException('Invalid Employer Id', HttpStatus.BAD_REQUEST);
    }
    return foundEmployer;
  }

  async checkOrder(id: number) {
    const foundOrder = await OrderEntity.findOne(id);

    if (!foundOrder?.id) {
      throw new HttpException('Invalid Order Id', HttpStatus.BAD_REQUEST);
    }
    return foundOrder;
  }

  async checkOrderAccessibility(Order: OrderEntity, eid: number) {
    if (Order.employer?.id != eid) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async checkTicket(id: number) {
    const foundTicket = await TicketEntity.findOne(id);

    if (!foundTicket?.id) {
      throw new HttpException('Invalid Ticket Id', HttpStatus.BAD_REQUEST);
    }
    return foundTicket;
  }

  async checkTicketAccessibility(Ticket: TicketEntity, eid: number) {
    if (Ticket.employer?.id != eid) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  checkCorrespondingIds(id1: number, id2: number) {
    if (id1 != id2 && id2) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
