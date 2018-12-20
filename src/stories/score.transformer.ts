import { ValueTransformer } from 'typeorm';

export class ScoreTransformer implements ValueTransformer {
  to(value: number): string {
    return value && value.toString();
  }

  from(value: string): number | string {
    const nValue: number = parseInt(value, 10);
    return Number.isNaN(nValue) ? value : nValue;
  }
}
