import { Card, Phase, Status } from "../models";

type UseCardSortResult = {
  [key in Phase]: { [key in Status]: Card[] };
};

export default function useCardSort(cards: Card[]): UseCardSortResult {
  return {
    [Phase.Prototype]: {
      [Status.Todo]: cards.filter((c) => c.isPrototypeToDo()),
      [Status.Doing]: cards.filter((c) => c.isPrototypeDoing()),
      [Status.Done]: cards.filter((c) => c.isPrototypeDone()),
    },
    [Phase.Test]: {
      [Status.Todo]: cards.filter((c) => c.isTestToDo()),
      [Status.Doing]: cards.filter((c) => c.isTestDoing()),
      [Status.Done]: cards.filter((c) => c.isTestDone()),
    },
    [Phase.Scale]: {
      [Status.Todo]: cards.filter((c) => c.isScaleToDo()),
      [Status.Doing]: cards.filter((c) => c.isScaleDoing()),
      [Status.Done]: cards.filter((c) => c.isScaleDone()),
    },
  };
}
