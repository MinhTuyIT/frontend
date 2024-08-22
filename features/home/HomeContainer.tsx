import { useCallback, useState } from "react";

import HomeView from "./HomeView";
type Sort = "soonest" | "later";
export interface IHomeProps {
  isLoadMore?: boolean;
  isLoading?: boolean;
  auctions?: any[];
  sortType?: Sort;
  isFilter?: boolean;
  filter?: MenuFIlter;
  onLoadMore?: () => void;
  onPressSort?: (type: Sort) => void;
  onChangeFilter?: (filter: MenuFIlter) => void;
}
interface MenuFIlter {
  title: string;
  key: string;
}
export const MenuFilterList: MenuFIlter[] = [
  { title: "Item", key: "item" },
  { title: "Grade", key: "grade" },
  { title: "Status", key: "status" },
  { title: "Account", key: "account" },
  { title: "Current Bid", key: "current_bid" },
];

const HomeContainer = () => {
  const [filter, setFilter] = useState<MenuFIlter>(MenuFilterList[0]);
  const onChangeFilter = useCallback((value: MenuFIlter) => {
    setFilter(value);
  }, []);
  return <HomeView onChangeFilter={onChangeFilter} filter={filter} />;
};

export default HomeContainer;
