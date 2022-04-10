import { Card } from "../models";
import { Phase, Status } from "../types";

export class CardsDecorator {
    constructor(public cards: Card[]) {}
  
    public get items() {
      return this.cards;
    }
  
    public sort() {
      return {
        [Phase.Prototype]: {
          [Status.Todo]: this.cards.filter((c) => c.isPrototypeToDo()),
          [Status.Doing]: this.cards.filter((c) => c.isPrototypeDoing()),
          [Status.Done]: this.cards.filter((c) => c.isPrototypeDone()),
        },
        [Phase.Test]: {
          [Status.Todo]: this.cards.filter((c) => c.isTestToDo()),
          [Status.Doing]: this.cards.filter((c) => c.isTestDoing()),
          [Status.Done]: this.cards.filter((c) => c.isTestDone()),
        },
        [Phase.Scale]: {
          [Status.Todo]: this.cards.filter((c) => c.isScaleToDo()),
          [Status.Doing]: this.cards.filter((c) => c.isScaleDoing()),
          [Status.Done]: this.cards.filter((c) => c.isScaleDone()),
        },
      };
    }
  
    public move(cardId: number, phase: Phase, status: Status) {
      const card = this.find(cardId);
      if (!card) {
        return this;
      }
  
      return this.update(card.move({ phase, status }));
    }
  
    public update(card: Card) {
      const index = this.findIndex(card);
      this.cards[index] = card;
  
      return new CardsDecorator([...this.cards]);
    }
  
    private find(id: number) {
      return this.cards[this.findIndex(id)];
    }
  
    private findIndex(card: Card | number) {
      return this.cards.findIndex((c) => c.equals(card));
    }
  }