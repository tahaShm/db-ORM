import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import FreelancerEntity from 'src/db/freelancer.entity';
import WithdrawEntity from 'src/db/withdraw.entity';
import FreelancerDto from '../dto/freelancer.dto';
import WithdrawDto from '../dto/withdraw.dto';

@Injectable()
export class FreelancersService {
  //freelancers

  async insertFreelancer(
    newFreelancer: FreelancerDto,
  ): Promise<FreelancerEntity> {
    const { withdrawIds, ...freelancerInfo } = newFreelancer;
    const freelancer = new FreelancerEntity();
    Object.keys(freelancerInfo).forEach((key) => {
      freelancer[key] = freelancerInfo[key];
    });
    freelancer.withdraws = [];

    if (withdrawIds) {
      for (let i = 0; i < withdrawIds.length; i++) {
        const withdraw = await WithdrawEntity.findOne(withdrawIds[i]);
        freelancer.withdraws.push(withdraw);
      }
    }

    await freelancer.save();
    return freelancer;
  }

  async getFreelancers(): Promise<FreelancerEntity[]> {
    return FreelancerEntity.find();
  }

  async getFreelancer(id: number): Promise<FreelancerEntity> {
    const foundFreelancer = await this.checkFreelancer(id);

    return foundFreelancer;
  }

  async deleteFreelancer(id: number): Promise<any> {
    await this.checkFreelancer(id);

    return await FreelancerEntity.delete({ id });
  }

  async updateFreelancer(
    id: number,
    curFreelancer: FreelancerDto,
  ): Promise<any> {
    await this.checkFreelancer(id);

    let { withdrawIds, ...freelancerInfo } = curFreelancer;
    return FreelancerEntity.update({ id }, freelancerInfo);
  }

  //withdraws

  async insertWithdraw(
    fid: number,
    newWithdraw: WithdrawDto,
  ): Promise<WithdrawEntity> {
    await this.checkFreelancer(fid);

    const { ...withdrawInfo } = newWithdraw;
    const withdraw = new WithdrawEntity();
    Object.keys(withdrawInfo).forEach((key) => {
      withdraw[key] = withdrawInfo[key];
    });
    withdraw.freelancer = await FreelancerEntity.findOne(fid);

    await withdraw.save();
    return withdraw;
  }

  async getWithdraws(fid: number): Promise<WithdrawEntity[]> {
    await this.checkFreelancer(fid);

    const freelancer: FreelancerEntity = await FreelancerEntity.findOne({
      where: { id: fid },
      relations: ['withdraws'],
    });
    return freelancer.withdraws;
  }

  async getWithdraw(fid: number, wid: number): Promise<any> {
    await this.checkFreelancer(fid);
    await this.checkWithdraw(wid);

    const withdraw: WithdrawEntity = await WithdrawEntity.findOne({
      where: { id: wid },
      relations: ['freelancer'],
    });
    await this.checkWithdrawAccessibility(withdraw, fid);

    const { freelancer, ...withdrawInfo } = withdraw;

    if (withdraw.freelancer?.id == fid) return withdrawInfo;
  }

  async deleteWithdraw(fid: number, wid: number): Promise<any> {
    await this.getWithdraw(fid, wid);

    return await WithdrawEntity.delete({ id: wid });
  }

  async updateWithdraw(
    fid: number,
    wid: number,
    curWithdraw: WithdrawDto,
  ): Promise<any> {
    await this.getWithdraw(fid, wid);

    const { freelancerId, ...withdrawInfo } = curWithdraw;
    return WithdrawEntity.update({ id: wid }, withdrawInfo);
  }

  //utils

  async checkFreelancer(id: number) {
    const foundFreelancer = await FreelancerEntity.findOne(id);

    if (!foundFreelancer?.id) {
      throw new HttpException('Invalid Freelancer Id', HttpStatus.BAD_REQUEST);
    }
    return foundFreelancer;
  }

  async checkWithdraw(id: number) {
    const foundWithdraw = await WithdrawEntity.findOne(id);

    if (!foundWithdraw?.id) {
      throw new HttpException('Invalid Withdraw Id', HttpStatus.BAD_REQUEST);
    }
    return foundWithdraw;
  }

  async checkWithdrawAccessibility(withdraw: WithdrawEntity, fid: number) {
    if (withdraw.freelancer?.id != fid) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  checkCorrespondingIds(id1: number, id2: number) {
    if (id1 != id2 && id2) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
