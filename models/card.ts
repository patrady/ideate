import { Phase, Status } from "../types";
import { Model } from "./model";

type TestProps = {
  metrics: string;
  successCriteria: string;
  learnings: string;
};

type ScaleProps = {
  notes: string;
};

type PrototypeProps = {
  notes: string;
};

export type CardProps = {
  id: number;
  title: string;
  description: string;
  prototype: PrototypeProps;
  test: TestProps;
  scale: ScaleProps;
  endDate?: string | Date;
  tags: string[];
  status: Status;
  phase: Phase;
  order: number;
  isArchived: boolean;
  links: string[];
};

export type AddCardProps = Pick<
  CardProps,
  "title" | "description" | "prototype" | "test" | "scale" | "tags" | "links"
>;

export type UpdateCardProps = Pick<CardProps, "id"> & UpdateableCardProps;

export type UpdateableCardProps = Partial<
  Pick<
    CardProps,
    | "title"
    | "description"
    | "prototype"
    | "test"
    | "scale"
    | "tags"
    | "isArchived"
    | "links"
    | "phase"
    | "status"
  >
>;

export class Card extends Model {
  id: number;
  title: string;
  description: string;
  prototype: PrototypeProps;
  test: TestProps;
  scale: ScaleProps;
  endDate?: Date;
  tags: string[];
  status: Status;
  phase: Phase;
  order: number;
  isArchived: boolean;
  links: string[];

  constructor({
    id,
    title,
    description,
    test,
    scale,
    prototype,
    endDate,
    tags,
    status,
    phase,
    order,
    isArchived,
    links,
  }: CardProps) {
    super();

    this.id = id;
    this.title = title;
    this.description = description;
    this.prototype = prototype;
    this.test = test;
    this.scale = scale;
    this.endDate = endDate ? new Date(endDate) : undefined;
    this.tags = tags || [];
    this.status = status;
    this.phase = phase;
    this.order = order;
    this.isArchived = isArchived;
    this.links = links || [];
  }

  public equals(card: number | Card) {
    if (typeof card === "number") {
      return this.id === card;
    }

    return this.id === card.id;
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

  public isToDo() {
    return this.status === Status.Todo;
  }

  public isDoing() {
    return this.status === Status.Doing;
  }

  public isDone() {
    return this.status === Status.Done;
  }

  public isPrototype() {
    return this.phase === Phase.Prototype;
  }

  public isTest() {
    return this.phase === Phase.Test;
  }

  public isScale() {
    return this.phase === Phase.Scale;
  }
}
