import { useEffect, useState } from "react";
import { CardsDecorator } from "../decorators";
import {
  AddableCardprops as AddableCardProps,
  Card,
  Organization,
  Team,
  UpdateableCardProps,
} from "../models";
import { CardsSdk } from "../sdk/ideate";
import { Phase, Status } from "../types";
import useBool from "./useBool";
import useLocale from "./useLocale";
import useTeam from "./useTeam";

type UseCardsValue = {
  cards: CardsDecorator;
  isLoading: boolean;
  error?: string;
  addCard(values: AddableCardProps): Promise<void>;
  moveCard(card: Card, phase: Phase, status: Status): Promise<void>;
  updateCard(card: Card, values: UpdateableCardProps): Promise<void>;
  removeCard(card: Card): Promise<void>;
};

export default function useCards(): UseCardsValue {
  const { organization, team, isLoading: isTeamLoading } = useTeam();
  const [cards, setCards] = useState(new CardsDecorator([]));
  const [isLoading, stopLoading, startLoading] = useBool(false);
  const [error, setError] = useState<string>();
  const t = useLocale();

  useEffect(() => {
    if (organization && team) {
      getCards(organization, team);
    }
  }, [organization, team]);

  async function getCards(organization: Organization, team: Team) {
    startLoading();

    const cards = await new CardsSdk().get(organization, team);
    setCards(new CardsDecorator(cards));

    stopLoading();
  }

  async function addCard(values: AddableCardProps) {
    if (!organization || !team) {
      return;
    }

    try {
      const newCard = await new CardsSdk().add(organization, team, values);
      console.log('new card', newCard);
      setCards(cards.add(newCard));
    } catch (error) {
      console.error(error);
      setError(t.models.card.errors.add);
    }
  }

  async function moveCard(card: Card, phase: Phase, status: Status) {
    try {
      const updatedCard = await new CardsSdk().move(card, phase, status);
      setCards(cards.update(updatedCard));
    } catch (error) {
      console.error(error);
      setError(t.models.card.errors.add);
    }
  }

  async function updateCard(card: Card, values: UpdateableCardProps) {
    try {
      const updatedCard = await new CardsSdk().update(card, values);
      setCards(cards.update(updatedCard));
    } catch (error) {
      console.error(error);
      setError(t.models.card.errors.update);
    }
  }

  async function removeCard(card: Card) {
    try {
      await new CardsSdk().delete(card);
      setCards(cards.remove(card));
    } catch (error) {
      console.error(error);
      setError(t.models.card.errors.delete);
    }
  }

  return {
    cards,
    isLoading: isLoading || isTeamLoading,
    error,
    addCard,
    moveCard,
    updateCard,
    removeCard,
  };
}
