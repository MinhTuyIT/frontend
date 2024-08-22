import { SimpleLineIcons } from "@expo/vector-icons";
import { Box, Button, Icon, VStack } from "@gluestack-ui/themed";
import { ArrowLeftIcon } from "lucide-react-native";
import React, { PropsWithChildren } from "react";

import { NavButton, Text } from "@/components/Elements";
import { testIDs } from "e2e/testIDs";

export interface HeaderAccountViewProps {
  onMenuPress?: () => void;
  title?: string;
  icon?: React.ReactNode;
  onBack?: () => void;
}

const HeaderAccountView: React.FC<
  PropsWithChildren<HeaderAccountViewProps>
> = ({ children, onMenuPress, title, icon, onBack }) => (
  <>
    <Box
      alignItems="center"
      flexDirection="row"
      pt="$8"
      px="$9"
      zIndex={99}
      bg="$white"
      gap="$5"
      testID={testIDs.ACCOUNT.DRAWER}
    >
      <Button
        px="$1.5"
        maxHeight={28}
        bg="$bgButtonGray91"
        size="sm"
        rounded="$sm"
        onPress={onBack}
      >
        <Icon as={ArrowLeftIcon} />
      </Button>
      <NavButton
        onPress={onMenuPress}
        alignItems="center"
        flexDirection="row"
        justifyContent="flex-start"
        borderWidth={1}
        borderColor="$primary800"
        rounded={9}
        h={38}
        flex={1}
        gap="$2.5"
      >
        <VStack
          bg="#E8E8E8"
          rounded={4}
          w="$6"
          h="$6"
          justifyContent="center"
          alignItems="center"
          m="$2"
        >
          <SimpleLineIcons name="grid" size={15} />
        </VStack>
        {icon}
        <Text fontSize="$sm" lineHeight="$2xl" fontFamily="$bodyBold">
          {title}
        </Text>
      </NavButton>
    </Box>
    {children}
  </>
);

export default HeaderAccountView;
