import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Box,
  Heading,
} from "@chakra-ui/core/dist";
import ReactMarkdown from "react-markdown";

type HowToGuideModalPropTypes = {
  isOpen: boolean;
  onClose: any;
};

export const HowToGuideModal = (props: HowToGuideModalPropTypes) => {
  const { isOpen, onClose } = props;
  const [data, setData] = useState("");

  useEffect(() => {
    if (typeof fetch !== "undefined") {
      // @todo change url to file on REPO.
      fetch("./readme.md")
        .then((resp: Response) => resp.text())
        .then((data: any) => setData(data));
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"900px"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading
            size={"lg"}
            backgroundColor={"royalblue"}
            display={"inline-block"}
            p={2}
            px={6}
            color={"white"}
          >
            How to use guide...
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box className={"how-to-guide"}>
            <ReactMarkdown source={data} escapeHtml={false} />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
