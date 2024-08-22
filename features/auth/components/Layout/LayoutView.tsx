import { Box, VStack } from "@gluestack-ui/themed";
import React from "react";

import Container from "./Container";

interface LayoutViewProps {
  formWidth: number;
  titleWidth: number;
}

const LayoutView: React.FC<React.PropsWithChildren<LayoutViewProps>> = ({
  children,
  formWidth,
  titleWidth,
}) => (
  <Box
    position="relative"
    h="$full"
    sx={{
      _web: {
        minHeight: "100vh",
      },
      "@base": {
        bgColor: "$darkBlue600",
      },
      "@xl": {
        bgColor: "$secondary0",
      },
    }}
  >
    <Container flex={1}>
      <Box
        flex={1}
        sx={{
          "@base": {
            flexDirection: "column-reverse",
          },
          "@xl": {
            flexDirection: "row",
            justifyContent: "center",
          },
        }}
      >
        <Box
          flex={1}
          alignItems="center"
          sx={{
            "@base": {
              mt: "$5",
            },
            "@sm": {
              mt: "$12",
            },
            "@xl": {
              mt: "$0",
            },
          }}
        >
          <Box
            width={formWidth}
            minHeight="$48"
            mb="$10"
            sx={{
              "@base": {
                mx: "auto",
              },
              "@xl": {
                mx: "unset",
                my: "auto",
              },
            }}
          >
            {children}
          </Box>
        </Box>

        <VStack
          sx={{
            "@xl": {
              flex: 1,
            },
          }}
        >
          <Box flex={1} flexDirection="row" justifyContent="center">
            <Box
              alignItems="flex-start"
              sx={{
                "@base": {
                  width: titleWidth,
                  px: "$12",
                  mt: "17%",
                  _web: {
                    mt: "17vh",
                  },
                },
                "@sm": {
                  mt: "$15",
                  px: "$0",
                },
                "@xl": {
                  width: titleWidth,
                  px: "2%",
                  mt: "$25",
                  _web: {
                    maxWidth: "33vw",
                    marginRight: "6.5vh",
                  },
                },
              }}
            >
              <Box
                width="$full"
                height="$1/4"
                sx={{
                  paddingTop: "37%",
                  _web: {
                    backgroundImage: "url(/images/auth-title.png)",
                    backgroundPosition: "top center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  },
                  "@xl": {
                    paddingTop: 0,
                  },
                }}
                zIndex={1}
              />
            </Box>
          </Box>
          <Box
            display="none"
            sx={{
              "@xl": {
                _web: {
                  display: "flex",
                  position: "absolute",
                  bottom: "$0",
                  width: "108%",
                  height: "54%",
                },
              },
            }}
          />
        </VStack>
      </Box>
    </Container>
  </Box>
);

export default LayoutView;
