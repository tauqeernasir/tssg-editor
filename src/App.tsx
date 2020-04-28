import React, { ReactElement, useEffect, useState } from "react";
import { Grid, Box, Button, Flex } from "@chakra-ui/core";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

import "./index.css";

import { Icon, useDisclosure } from "@chakra-ui/core/dist";

import { HowToGuideModal } from "./HowToGuideModal";
import { Header } from "./components/Header";
import { TssgEditor } from "./components/TssgEditor";

// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";

export const App = (): ReactElement => {
  const navHeight = 80;
  const [parsedData, setParsedData] = useState();
  const [jsonCopied, setJsonCopied] = useState(false);

  useEffect(() => {
    setJsonCopied(false);
  }, [parsedData]);

  const wHeight = window?.innerHeight;
  const wWidth = window?.innerWidth;
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Box h={navHeight} position={"relative"}>
        <Header
          rightSection={
            <Button
              onClick={onOpen}
              size={"md"}
            >
              <Icon name={"info-outline"} mr={2} /> How to use?
            </Button>
          }
        />
      </Box>
      <Flex>
        <Box flex={1}>
          <TssgEditor
            setParsedData={setParsedData}
            width={wWidth}
            height={wHeight}
          />
        </Box>
        <Box flex={1} bg={"green.500"} color={"white"} position={"relative"}>
          <Box position={"absolute"} top={2} right={6}>
            <CopyToClipboard
              text={JSON.stringify(parsedData, null, 2)}
              onCopy={() => setJsonCopied(true)}
            >
              <Button size={"sm"} variantColor={"blue"}>
                <Icon name={jsonCopied ? "check" : "copy"} mr={2} /> Copy to
                clipboard
              </Button>
            </CopyToClipboard>
          </Box>
          <pre
            style={{
              overflowY: "scroll",
              height: wHeight - navHeight,
              padding: "10px",
              fontSize: "16px",
            }}
          >
            {JSON.stringify(parsedData, null, 2)}
          </pre>
        </Box>
      </Flex>

      <HowToGuideModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
