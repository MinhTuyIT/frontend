import { makeVar } from "@apollo/client";
import {
  SIDEBAR_ITEMS,
  SidebarItemProps,
} from "layout/LeftSidebar/LeftSidebarView.web";

export const selectedSidebarItem = makeVar<SidebarItemProps>(SIDEBAR_ITEMS[0]);
