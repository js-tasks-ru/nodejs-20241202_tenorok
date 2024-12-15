import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { isDefined, isIn } from "@nestjs/class-validator";

interface IOptions {
  enum: object;
  optional?: boolean;
}

@Injectable()
export class EnumValidationPipe implements PipeTransform<string, string> {
  private possibleValues: string[];
  private optional: boolean;

  constructor(options: IOptions) {
    this.possibleValues = Object.values(options.enum);
    this.optional = options.optional ?? false;
  }

  transform(value: string, { data: paramName }: ArgumentMetadata): string {
    const isValueDefined = isDefined(value);

    if (this.optional && !isValueDefined) {
      return;
    }

    if (isValueDefined && isIn(value, this.possibleValues)) {
      return value;
    }

    throw new BadRequestException(
      `Invalid parameter ${paramName}=${value}. Acceptable values: ${this.possibleValues.join(", ")}`,
    );
  }
}
