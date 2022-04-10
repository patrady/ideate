import { Dispatch, SetStateAction, useState } from "react";
import fakeCards from "../data/cards";
import { CardsDecorator } from "../decorators";

type UseCardsValue = {
  cards: CardsDecorator;
  isLoading: boolean;
  isError: boolean;
  onChangeCards: Dispatch<SetStateAction<CardsDecorator>>;
};

export default function useCards(): UseCardsValue {
  const [cards, setCards] = useState(new CardsDecorator(fakeCards));

  return {
    cards,
    isLoading: false,
    isError: false,
    onChangeCards: setCards,
  };
}
