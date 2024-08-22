import {
  Box,
  ChevronDownIcon,
  ChevronUpIcon,
  HStack,
  Icon,
  Pressable,
  Text,
  Tooltip,
  TooltipContent,
  TooltipText,
  VStack,
} from "@gluestack-ui/themed";
import { ColumnSort } from "@tanstack/react-table";
import React, { ComponentProps } from "react";

interface Props extends ComponentProps<typeof HStack> {
  id?: string;
  text?: string;
  isSort?: boolean;
  sorting?: ColumnSort;
  onSort?: (value: ColumnSort) => void;
}

const TableHeaderView = ({
  id = "",
  text,
  sorting,
  isSort = false,
  onSort,
  ...hStackProps
}: Props) => (
  <Tooltip
    placement="top"
    isDisabled={!isSort}
    trigger={triggerProps => {
      return (
        <Pressable
          {...triggerProps}
          disabled={!isSort}
          flex={1}
          onPress={() =>
            onSort
              ? onSort({ id, desc: !sorting ? false : !sorting?.desc })
              : {}
          }
        >
          <HStack
            borderLeftWidth="$1"
            {...hStackProps}
            flex={1}
            alignItems="center"
          >
            <Box m="$2">
              <Text fontSize="$lg">{text}</Text>
            </Box>
            {isSort && (
              <VStack>
                <Icon
                  as={ChevronUpIcon}
                  // color={
                  //   sorting
                  //     ? !sorting.desc && id === sorting.id
                  //       ? "$white"
                  //       : "$borderDark700"
                  //     : "$borderDark700"
                  // }
                />
                <Icon
                  as={ChevronDownIcon}
                  // color={
                  //   sorting
                  //     ? sorting.desc && id === sorting.id
                  //       ? "$white"
                  //       : "$borderDark700"
                  //     : "$borderDark700"
                  // }
                />
              </VStack>
            )}
          </HStack>
        </Pressable>
      );
    }}
  >
    <TooltipContent>
      <TooltipText>
        Sort {sorting?.desc ? "Descending" : "Ascending"}
      </TooltipText>
    </TooltipContent>
  </Tooltip>
);

export default TableHeaderView;
