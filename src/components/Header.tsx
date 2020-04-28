import { Badge, Box, Text, Flex, Heading } from "@chakra-ui/core/dist";
import React, { ReactElement } from "react";
import GitHubButton from "react-github-btn";

type HeaderProps = {
  rightSection?: any;
};

export const Header = (props: HeaderProps): ReactElement => {
  const { rightSection } = props;

  return (
    <Box pl={8}>
      <Flex alignItems={"center"}>
        <Box flex={1}>
          <Flex alignItems={"center"}>
            <Heading color={"green.500"}>TSSG</Heading>
            <Badge color={"white"} backgroundColor={"orange.400"} mx={2}>
              Alpha
            </Badge>
            <Heading size={"xs"} color={"black.200"}>
              The Swagger Schema Generator
            </Heading>
          </Flex>
          <Text>Write schema in an easy, concise and short way</Text>
        </Box>
        <Box>
          <Flex alignItems={"center"} mr={4}>
            <Box mr={4} mt={2}>
              <GitHubButton
                href="https://github.com/jskod/tssg-editor"
                data-size="large"
                data-show-count={true}
                aria-label="Star jskod/tssg-editor on GitHub"
              >
                Star
              </GitHubButton>
            </Box>
            {rightSection}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
