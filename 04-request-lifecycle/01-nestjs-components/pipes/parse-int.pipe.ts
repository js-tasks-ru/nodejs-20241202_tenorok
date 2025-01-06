import { BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseIntPipe implements PipeTransform {
  transform(value: string): number {
    const num = parseInt(value, 10);

    if (Number.isNaN(num)) {
      throw new BadRequestException(`"${value}" не является числом`);
    }

    return num;
  }
}
