export enum Status {
  Todo = 'todo',
  Doing = 'doing',
  Done = 'done',
}

export enum Phase {
  Prototype = 'prototype',
  Test = 'test',
  Scale = 'scale',
}

export type CardProps = {
  id: number;
  title: string;
  description: string;
  endDate?: string;
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

  constructor({ id, title, description, endDate, status, phase, order }: CardProps) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.endDate = endDate ? new Date(endDate) : undefined;
    this.status = status;
    this.phase = phase;
    this.order = order;
  }

  isToDo() {
    return this.status === Status.Todo;
  }

  isDoing() {
    return this.status === Status.Doing;
  }

  isDone() {
    return this.status === Status.Done;
  }

  isPrototype() {
    return this.phase === Phase.Prototype;
  }

  isTest() {
    return this.phase === Phase.Test;
  }

  isScale() {
    return this.phase === Phase.Scale;
  }

  isPrototypeToDo() {
    return this.isPrototype() && this.isToDo();
  }

  isPrototypeDoing() {
    return this.isPrototype() && this.isDoing();
  }

  isPrototypeDone() {
    return this.isPrototype() && this.isDone();
  }

  isTestToDo() {
    return this.isTest() && this.isToDo();
  }

  isTestDoing() {
    return this.isTest() && this.isDoing();
  }

  isTestDone() {
    return this.isTest() && this.isDone();
  }

  isScaleToDo() {
    return this.isScale() && this.isToDo();
  }

  isScaleDoing() {
    return this.isScale() && this.isDoing();
  }

  isScaleDone() {
    return this.isScale() && this.isDone();
  }
}
