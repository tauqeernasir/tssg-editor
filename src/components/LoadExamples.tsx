import React, { ReactElement, useCallback } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Heading,
  ModalBody,
  Stack,
  useDisclosure,
  PseudoBox,
  ModalCloseButton,
} from "@chakra-ui/core/dist";
import {
  arraySchemaExample,
  mixedSchemaExample,
  objectSchemaExample,
  simpleExample,
  enumsExample
} from "./examples";

type ExampleListItemProps = {
  title: string;
  onClick: () => void;
};

function ExampleListItem(props: ExampleListItemProps): ReactElement {
  const { title, onClick } = props;

  return (
    <PseudoBox
      onClick={onClick}
      p={2}
      bg={"blue.500"}
      _hover={{ bg: "blue.600" }}
      mb={2}
      cursor={"pointer"}
      color={"white"}
      transition={"all .6s"}
      borderRadius={4}
    >
      {title}
    </PseudoBox>
  );
}

type LoadExamplesProps = {
  onLoadExample: (value: string) => void;
};

function LoadExamples(props: LoadExamplesProps) {
  const { onLoadExample } = props;

  const { isOpen, onClose, onOpen } = useDisclosure();

  const loadExample = useCallback((example: string): void => {
    onLoadExample && onLoadExample(example);
    onClose();
  }, []);

  return (
    <>
      <Button onClick={onOpen} type="button" size={"sm"} variantColor={"blue"}>
        Load Examples
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent borderRadius={4}>
          <ModalHeader>
            <Heading size={"lg"} fontWeight={"bold"}>
              Select an example to load
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <ExampleListItem
                title={"Simple Schema"}
                onClick={() => loadExample(simpleExample)}
              />
              <ExampleListItem
                title={"Schema using Object data type"}
                onClick={() => loadExample(objectSchemaExample)}
              />
              <ExampleListItem
                title={"Simple using Array data type"}
                onClick={() => loadExample(arraySchemaExample)}
              />
              <ExampleListItem
                title={"Simple using Mixed data types"}
                onClick={() => loadExample(mixedSchemaExample)}
              />
              <ExampleListItem
                  title={"Simple Schema with Enums"}
                  onClick={() => loadExample(enumsExample)}
              />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoadExamples;
