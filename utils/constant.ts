import { testIDs } from "e2e/testIDs";

import { AccountType, PayoutType } from "@/generated/graphql";
import { formatPaymentMethod } from "@/utils/format";
const payoutTypeOptionsFixedOrder = [
  {
    label: formatPaymentMethod(PayoutType.Paypal),
    value: PayoutType.Paypal,
  },
  {
    label: formatPaymentMethod(PayoutType.Check),
    value: PayoutType.Check,
  },
  {
    label: formatPaymentMethod(PayoutType.Wire),
    value: PayoutType.Wire,
  },
  {
    label: formatPaymentMethod(PayoutType.Ach),
    value: PayoutType.Ach,
  },
];

export const paymentOptions = Object.entries(PayoutType).reduce(
  (acc, [key, value]) => {
    if (
      !isNaN(Number(key)) ||
      payoutTypeOptionsFixedOrder.some(v => v.value === value)
    ) {
      return acc;
    }
    return [...acc, { value, label: formatPaymentMethod(value) }];
  },
  payoutTypeOptionsFixedOrder as { value: PayoutType; label: string }[]
);
export const accountTypeOptions = Object.entries(AccountType).reduce(
  (acc, [key, value]) => {
    const lowerCasedAccountType = value?.toLocaleLowerCase() || "";
    if (!isNaN(Number(key))) {
      return acc;
    }
    return [
      ...acc,
      {
        value,
        label:
          lowerCasedAccountType.charAt(0).toUpperCase() +
          lowerCasedAccountType.slice(1),
      },
    ];
  },
  [] as { value: AccountType; label: string }[]
);

export const MenuList = [
  {
    title: "Submissions",
    key: "submission",
    testID: testIDs.MENU_LIST.SUBMISSIONS_ITEM,
  },
  {
    title: "Watch List",
    key: "watch-list",
    testID: testIDs.MENU_LIST.WATCH_LIST_ITEM,
  },
  {
    title: "My Auctions",
    key: "my-auction",
    testID: testIDs.MENU_LIST.MY_AUCTION_ITEM,
  },
  {
    title: "Account",
    key: "account",
    testID: testIDs.MENU_LIST.ACCOUNT_ITEM,
  },
  {
    title: "Sign Out",
    key: "sign_out",
    testID: testIDs.MENU_LIST.SIGN_OUT_ITEM,
  },
];
export const ScreenConfigs = [
  { name: "(home)", title: "Home", drawerLabel: "Home" },
  { name: "submission", title: "Submission", drawerLabel: "Submission" },
  { name: "watch-list", title: "Watch List", drawerLabel: "Watch List" },
  { name: "my-auction", title: "My Auctions", drawerLabel: "My Auctions" },
  { name: "account", title: "Account", drawerLabel: "Account" },
];
