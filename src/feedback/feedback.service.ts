import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { UpdateFeedbackDto } from './dtos/update-feedback.dto';

@Injectable()
export class feedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepo: Repository<Feedback>,
  ) {}
  async create(userId: number, createFeedbackDto: CreateFeedbackDto) {
    const { feedback, rate } = createFeedbackDto;
    const newFeedback = this.feedbackRepo.create({
      feedback,
      rate,
      user: { id: userId },
    });
    return this.feedbackRepo.save(newFeedback);
  }
  async getAll() {
    const result = await this.feedbackRepo.query(`
    select count(*) as numOfFeedbacks,avg(rate) as averageRating  from feedback
    `);
    const feedbacks = await this.feedbackRepo.find({ relations: ['user'] });
    const avgRating = parseFloat(result[0].averagerating).toFixed(2);
    return {
      feedbacks,
      numOfFeedbacks: parseInt(result[0].numoffeedbacks, 10),
      averageRating: avgRating,
    };
  }
  async update(
    userId: number,
    feedbackId: number,
    updateFeedbackDto: UpdateFeedbackDto,
  ) {
    const feedback = await this.feedbackRepo.findOne({
      where: { id: feedbackId, user: { id: userId } },
    });
    if (!feedback) {
      throw new BadRequestException('Feedback not found or unauthorized');
    }
    feedback.feedback = updateFeedbackDto.feedback
      ? updateFeedbackDto.feedback
      : feedback.feedback;
    feedback.rate = updateFeedbackDto.rate
      ? updateFeedbackDto.rate
      : feedback.rate;
    return this.feedbackRepo.save(feedback);
  }
  async delete(userId: number, feedbackId: number) {
    const feedback = await this.feedbackRepo.findOne({
      where: { id: feedbackId, user: { id: userId } },
    });
    if (!feedback) {
      throw new BadRequestException('Feedback not found or unauthorized');
    }
    return this.feedbackRepo.remove(feedback);
  }
}
