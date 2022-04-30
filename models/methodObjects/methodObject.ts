import { QueryParam } from "../../types";
import { Model } from "..";

export abstract class MethodObject<T extends Model> {
  id: QueryParam;

  constructor(id: QueryParam) {
    this.id = id;
  }

  public abstract exists(): boolean;
  public abstract getValue(): T | Promise<T>;
  public abstract getErrors(): string[];

  public isValid(): boolean {
    return !this.getErrors().length;
  }

  public getId(): number {
    return Model.getIdFromQuery(this.id);
  }
}
