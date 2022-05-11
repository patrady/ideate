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

  public isInvalid(): boolean {
    return this.getErrors().length > 0;
  }

  public getId(): number | string {
    return Model.getIdFromQuery(this.id);
  }

  public getStringId(): string {
    return Model.getStringIdFromQuery(this.id);
  }
}
