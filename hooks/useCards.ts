import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CardsDecorator } from "../decorators";
import { AddCardProps, Card, UpdateCardProps } from "../models";
import { Phase, Status } from "../types";
import useLocale from "./useLocale";

type UseCardsValue = {
  cards: CardsDecorator;
  isLoading: boolean;
  error?: string;
  setCards: Dispatch<SetStateAction<CardsDecorator>>;
  addCard(values: AddCardProps): Promise<void>;
  moveCard(card: Card, phase: Phase, status: Status): Promise<void>;
  updateCard(card: Card, values: UpdateCardProps): Promise<void>;
  removeCard(card: Card): Promise<void>;
};

export default function useCards(): UseCardsValue {
  const [cards, setCards] = useState(new CardsDecorator([]));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const t = useLocale();

    useEffect(() => {
    getCards();
  }, []);

  async function getCards() {
    try {
      setIsLoading(true);
      setCards(new CardsDecorator(await Card.getByTeam()));
    } catch (error) {
      console.error(error);
      setError(t.models.card.errors.get);
    } finally {
      setIsLoading(false);
    }
  }

  async function addCard(values: AddCardProps) {
    try {
      const newCard = await Card.add(values);
      setCards(cards.add(newCard));
    } catch (error) {
      console.error(error);
      setError(t.models.card.errors.add);
    }
  }

  async function moveCard(card: Card, phase: Phase, status: Status) {
    try {
      const updatedCard = await card.move(phase, status);
      setCards(cards.update(updatedCard));
    } catch (error) {
      console.error(error);
      setError(t.models.card.errors.add);
    }
  }

  async function updateCard(card: Card, values: UpdateCardProps) {
    try {
      const updatedCard = await card.update(values);
      setCards(cards.update(updatedCard));
    } catch (error) {
      console.error(error);
      setError(t.models.card.errors.update);
    }
  }

  async function removeCard(card: Card) {
    try {
      await card.delete();
      setCards(cards.remove(card));
    } catch (error) {
      console.error(error);
      setError(t.models.card.errors.delete);
    }
  }

  return {
    cards,
    isLoading,
    error,
    setCards,
    addCard,
    moveCard,
    updateCard,
    removeCard
  };
}
