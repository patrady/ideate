import { Phase, Status } from "../types";

export type CardProps = {
  id: number;
  title: string;
  description: string;
  endDate?: string | Date;
  status: Status;
  phase: Phase;
  order: number;
};

export class Card {
  id: number;
  title: string;
  description: string;
  endDate?: Date;
  status: Status;
  phase: Phase;
  order: number;

  constructor({
    id,
    title,
    description,
    endDate,
    status,
    phase,
    order,
  }: CardProps) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.endDate = endDate ? new Date(endDate) : undefined;
    this.status = status;
    this.phase = phase;
    this.order = order;
  }

  public equals(card: number | Card) {
    if (typeof card === "number") {
      return this.id === card;
    }

    return this.id === card.id;
  }

  public move({ phase, status }: { phase: Phase; status: Status }) {
    return new Card({ ...this, phase, status });
  }

  public isPrototypeToDo() {
    return this.isPrototype() && this.isToDo();
  }

  public isPrototypeDoing() {
    return this.isPrototype() && this.isDoing();
  }

  public isPrototypeDone() {
    return this.isPrototype() && this.isDone();
  }

  public isTestToDo() {
    return this.isTest() && this.isToDo();
  }

  public isTestDoing() {
    return this.isTest() && this.isDoing();
  }

  public isTestDone() {
    return this.isTest() && this.isDone();
  }

  public isScaleToDo() {
    return this.isScale() && this.isToDo();
  }

  public isScaleDoing() {
    return this.isScale() && this.isDoing();
  }

  public isScaleDone() {
    return this.isScale() && this.isDone();
  }

  private isToDo() {
    return this.status === Status.Todo;
  }

  private isDoing() {
    return this.status === Status.Doing;
  }

  private isDone() {
    return this.status === Status.Done;
  }

  private isPrototype() {
    return this.phase === Phase.Prototype;
  }

  private isTest() {
    return this.phase === Phase.Test;
  }

  private isScale() {
    return this.phase === Phase.Scale;
  }
}
