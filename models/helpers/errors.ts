export class Errors {
  public static from(errors: { [error: string]: boolean }): string[] {
    return Object.entries(errors)
      .filter(([, value]) => value)
      .map(([key]) => key);
  }
}
