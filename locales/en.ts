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
    update: "Update",
    cancel: "Cancel",
    delete: "Delete",
  },
  addTagModal: {
    title: "Add Tag",
  },
  addTeamModal: {
    title: "Add Team"
  },
  updateTeamModal: {
    title: "Update Team"
  },
  pages: {
    organizations: {
      index: {
        title: "Ideate | Teams",
        description: "View all the teams in an organization"
      },
      show: {
        teams: {
          show: {
            title: "Ideate | Board",
            description: "Track product prototypes, tests, and features for a team",
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
    team: {
      errors: {
        add: "Oh no, that team couldn't be added",
        update: "Oh no, that team couldn't be updated",
      }
    }
  },
};
