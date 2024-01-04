export interface ContextMenuConfig {
  [key: string]: {
    [key: string]: {
      title: string;
      breakAfter?: boolean;
    };
  };
}

export const contextMenuConfig: ContextMenuConfig = {
  default: {
    "new-folder": {
      title: "New Folder",
      breakAfter: true,
    },
    "get-info": {
      title: "Get Info",
    },
    "change-desktop-bg": {
      title: "Change Desktop Background",
      breakAfter: true,
    },
    "use-stacks": {
      title: "Use Stacks",
    },
    "sort-by": {
      title: "Sort By",
    },
    "clean-up": {
      title: "Clean Up",
    },
    "clean-up-by": {
      title: "Clean Up By",
    },
    "show-view-options": {
      title: "Show View Options",
    },
  },
};
