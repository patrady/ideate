import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { Phase, Status } from "../types";
import { Model } from "./model";

type TestProps = {
  metrics: string;
  successCriteria: string;
  learnings: string;
  links: string[];
};

type ScaleProps = {
  notes: string;
  links: string[];
};

type PrototypeProps = {
  notes: string;
  links: string[];
};

export type CardProps = {
  id: string;
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
  organizationSlug: string;
  teamSlug: string;
};

export type AddableCardprops = Pick<
  CardProps,
  "title" | "description" | "prototype" | "test" | "scale" | "tags"
>;

export type AddCardProps = Pick<CardProps, "organizationSlug" | "teamSlug"> &
  AddableCardprops;

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
    | "phase"
    | "status"
  >
>;

export class Card extends Model {
  id: string;
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
  }: CardProps) {
    super();

    this.id = id;
    this.title = title;
    this.description = description;
    this.prototype = { ...prototype, links: prototype.links || [] };
    this.test = { ...test, links: test.links || [] };
    this.scale = { ...scale, links: scale.links || [] };
    this.endDate = endDate ? new Date(endDate) : undefined;
    this.tags = tags || [];
    this.status = status;
    this.phase = phase;
    this.order = order;
    this.isArchived = isArchived;
  }

  public static for(object: DocumentSnapshot<DocumentData>) {
    return new Card({
      ...(object.data() as CardProps),
      id: object.id,
    });
  }

  public equals(card: string | Card) {
    if (typeof card === "string") {
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

  public toJSON() {
    return this;
  }
}
