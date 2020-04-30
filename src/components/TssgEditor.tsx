import { Controlled as CodeMirror } from "react-codemirror2";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { Box, Button, Icon } from "@chakra-ui/core/dist";
import debounce from "lodash.debounce";

import { ssgToOASParser } from "tssg/dist/parsers/ssg";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/search/match-highlighter";
import "codemirror/addon/mode/simple";
import "codemirror/mode/javascript/javascript";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

type TssgEditorProps = {
  setParsedData?: any;
  width: number;
  height: number;
};

const savedValue = window.localStorage.getItem("savedValue");
const defaultValue = `/**
* Example TSSG Syntax
* Data Types:
* \tstring | s, number | n, integer | i, boolean | b, [], {}
* Marker:
* \tuse \`!\` sign to mark an object property as required
* Supported functions:
* \toneOf, allOf, anyOf
*
* For more information read \`how to use\` guide.
* This project is Work In Progress. It will soon support other swagger features.
*/

{
\tname: s,
\tage: !n,
\taddress: {
    \tcity: string,
        country: !string
    },
    choices: oneOf(s, n, b),
}`;
const savedOrDefaultValue = savedValue || defaultValue;

export const TssgEditor = (props: TssgEditorProps): ReactElement => {
  const { setParsedData, width: wWidth, height: wHeight } = props;

  const [value, setValue] = useState(savedOrDefaultValue);
  const [parsedError, setParsedError] = useState("" as any);

  const navHeight = 80;

  const parseAndSetValue = useCallback(
    debounce(
      (value: string) => {
        if (!value) return;
        try {
          const parsed = ssgToOASParser(`(${value})`);
          setParsedData(parsed);
          window.localStorage.setItem("savedValue", value);
          setParsedError("");
        } catch (e) {
          setParsedError(e.message);
        }
      },
      1000,
      { trailing: true }
    ),
    []
  );

  const resetToDefault = () => {
    window.localStorage.setItem("savedValue", defaultValue);
    setValue(defaultValue);
  };

  useEffect(() => {
    parseAndSetValue(value);
  }, [value]);

  return (
    <Box position={"relative"}>
      {parsedError && (
        <ErrorBar
          error={parsedError}
          {...{
            position: "absolute",
            left: 0,
            bottom: 0,
            zIndex: 999,
            width: "100%",
            color: "white",
          }}
        />
      )}
      <Box position="absolute" top={2} right={6} style={{ zIndex: 999 }}>
        <Button
          type="button"
          size={"sm"}
          variantColor={"blue"}
          onClick={resetToDefault}
        >
          <Icon name="repeat" mr={2} /> Reset to default code
        </Button>
      </Box>
      <CodeMirror
        editorDidMount={(codeMirror) => {
          codeMirror.setSize(wWidth / 2, wHeight - navHeight);
          // @ts-ignore
        }}
        className={"tssg-editor"}
        value={value}
        options={{
          lineWrapping: true,
          lineNumbers: true,
          theme: "material",
          smartIndent: false,
          autoCloseBrackets: true,
          highlightSelectionMatches: true,
          matchBrackets: true,
          mode: "javascript",
        }}
        onBeforeChange={(editor, data, value) => {
          setValue(value);
        }}
        onChange={(editor, data, value) => {}}
      />
    </Box>
  );
};

type ErrorBarProps = {
  error: string;
};

const ErrorBar = (props: ErrorBarProps): ReactElement => {
  const { error, ...rest } = props;
  console.log(error);
  return (
    <Box padding={2} bg={"orange.400"} {...rest}>
      {error || ""}
    </Box>
  );
};
