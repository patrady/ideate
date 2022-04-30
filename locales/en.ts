import { Team } from "../models";

export default {
  nav: {
    board: "Board",
    team: "Teams",
  },
  board: {
    columns: {
      todo: "To Do",
      doing: "Doing",
      done: "Done",
    },
    rows: {
      prototype: {
        title: "Prototype",
        description: "Are we solving the right problem?",
      },
      test: {
        title: "Test",
        description: "Are we approaching the problem the right way?",
      },
      scale: {
        title: "Scale",
        description: "Are we delivering the solution well?",
      },
    },
    addCardModal: {
      title: "Add Card",
    },
    updateCardModal: {
      title: "Update Card",
    },
    addCard: "Add Card",
  },
  tags: {
    add: "Add Tag",
  },
  modal: {
    add: "Add",
    cancel: "Cancel",
    delete: "Delete",
  },
  addTagModal: {
    title: "Add Tag",
  },
  pages: {
    organizations: {
      show: {
        teams: {
          show: {
            title: "Ideate | Board",
            description: (team: Team) =>
              `Track product prototypes, tests, and features for ${team}`,
          },
        },
      },
    },
    index: {
      title: "Ideate",
      description: "Track product prototypes, tests, and features",
    },
  },
  models: {
    card: {
      errors: {
        get: "Oh no, the cards could not be retrieved",
        add: "Oh no, that card couldn't be added",
        update: "Oh no, that card couldn't be updated",
        delete: "Oh no, that card couldn't be deleted",
      },
    },
  },
};
