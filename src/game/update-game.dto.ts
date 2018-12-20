export class UpdateGameDto {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly score: string | number;
}
