import { useReactiveVar } from "@apollo/client";
import { selectedSidebarItem } from "stores/sidebar";

import LeftSidebarView, { SidebarItemProps } from "./LeftSidebarView";

const LeftSidebarContainer = () => {
  const selectedItem = useReactiveVar(selectedSidebarItem);

  const setSelectedItem = (item: SidebarItemProps) => selectedSidebarItem(item);

  return <LeftSidebarView selected={selectedItem} onSelect={setSelectedItem} />;
};

export default LeftSidebarContainer;
