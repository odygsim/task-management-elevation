import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.DONE,
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
  ];
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isValidStatus(value))
      throw new BadRequestException(`${value} is not a valid status`);

    return value;
  }

  private isValidStatus(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
