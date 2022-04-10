import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CardsDecorator } from "../decorators";
import { AddCardProps, Card, UpdateCardProps } from "../models";
import useLocale from "./useLocale";

type UseCardsValue = {
  cards: CardsDecorator;
  isLoading: boolean;
  error?: string;
  setCards: Dispatch<SetStateAction<CardsDecorator>>;
  addCard(values: AddCardProps): Promise<void>;
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

  async function updateCard(values: UpdateCardProps) {
    try {
    } catch (error) {
      console.error(error);
      setError(t.models.card.errors.update);
    }
  }

  async function deleteCard() {
    try {
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
    addCard
  };
}
