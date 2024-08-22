import { Box, Button, ButtonText, Text } from "@gluestack-ui/themed";
import { router } from "expo-router";
import Head from "expo-router/head";
import { useCallback } from "react";

export default function NotFoundErrorPage() {
  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>404: This page could not be found.</title>
      </Head>

      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        sx={{
          _web: {
            justifyContent: "start",
          },
        }}
      >
        <Text
          textAlign="center"
          color="$textLight0"
          fontSize="$5xl"
          lineHeight="$5xl"
          sx={{
            _web: {
              mt: "11.94vh",
              fontSize: "7vh",
              lineHeight: "7.5vh",
            },
          }}
        >
          ERROR
        </Text>
        <Text
          color="$primary500"
          sx={{
            _web: {
              fontSize: "17vh",
              lineHeight: "18vh",
            },
          }}
        >
          404
        </Text>
        <Text
          color="$textLight0"
          fontSize="$lg"
          lineHeight="$lg"
          sx={{
            _web: {
              fontSize: "2.3vh",
              lineHeight: "2.5vh",
            },
          }}
        >
          Page Not Found
        </Text>
        <Button
          size="xl"
          rounded="$full"
          backgroundColor="$primary500"
          mb="$32"
          mt="$8"
          sx={{
            _web: {
              mt: "4.5vh",
              mb: "$0",
            },
          }}
          onPress={handleBack}
        >
          <ButtonText fontSize="$sm">Go Back</ButtonText>
        </Button>
      </Box>
    </>
  );
}
