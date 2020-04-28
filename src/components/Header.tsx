import { Badge, Box, Text, Flex, Heading } from "@chakra-ui/core/dist";
import React, { ReactElement } from "react";

export const Header = (): ReactElement => {
  return (
    <Box pl={8}>
      <Flex alignItems={"center"}>
        <Heading color={"green.500"}>TSSG</Heading>
        <Badge color={"white"} backgroundColor={"orange.400"} mx={2}>
          Alpha
        </Badge>
        <Heading size={"xs"} color={"black.200"}>
          The Swagger Schema Grammar
        </Heading>
      </Flex>
      <Text>Write schema in an easy, concise and short way</Text>
    </Box>
  );
};
