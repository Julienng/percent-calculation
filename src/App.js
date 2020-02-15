import React, { useState, useMemo } from "react";
import { swiss, deep } from "@theme-ui/presets";
/** @jsx jsx */
import {
  jsx,
  ThemeProvider,
  Input,
  Label,
  Grid,
  Heading,
  Box,
  Flex,
  Button,
  useColorMode
} from "theme-ui";

import BigNumber from "bignumber.js";

const theme = {
  ...swiss,
  colors: {
    ...swiss.colors,
    modes: {
      dark: deep.colors
    }
  }
};

function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

function LabelCentered(props) {
  return (
    <Label sx={{ justifyContent: "center", alignItems: "center" }} {...props} />
  );
}

function Output(props) {
  return (
    <output
      sx={{
        backgroundColor: "highlight",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold"
      }}
      {...props}
    />
  );
}

function prettyPrintNumber(value) {
  if (value.isNaN()) {
    return "–";
  }

  if (!value.isFinite()) {
    return "∞";
  }

  if (value.isInteger()) {
    return value.toString();
  }

  return value.toFormat(2);
}

function ExtractValue() {
  const [percent, setPercent] = useState(10);
  const [value, setValue] = useState(1000);

  const result = useMemo(() => {
    const val = new BigNumber(value);
    const perc = new BigNumber(percent);
    return prettyPrintNumber(val.times(perc).div(new BigNumber(100)));
  }, [percent, value]);

  return (
    <Grid
      gap={5}
      columns={[2, 2, 6]}
      p={[3, 3, 0]}
      bg={["muted", "muted", "background"]}
    >
      <LabelCentered htmlFor="pourcentage">pourcentage</LabelCentered>
      <Input
        id="pourcentage"
        type="number"
        value={percent}
        onChange={e => setPercent(e.currentTarget.valueAsNumber)}
      />
      <LabelCentered htmlFor="value">avec</LabelCentered>
      <Input
        id="value"
        type="number"
        value={value}
        onChange={e => setValue(e.currentTarget.valueAsNumber)}
      />
      <LabelCentered htmlFor="result-value"> donne </LabelCentered>
      <Output id="result-value">{result}</Output>
    </Grid>
  );
}

function ExtractPercent() {
  const [partValue, setPartValue] = useState(100);
  const [totalValue, setTotalValue] = useState(1000);

  const result = useMemo(() => {
    const val = new BigNumber(partValue);
    const total = new BigNumber(totalValue);
    return prettyPrintNumber(val.div(total).times(new BigNumber(100)));
  }, [partValue, totalValue]);

  return (
    <Grid
      gap={5}
      columns={[2, 2, 6]}
      p={[3, 3, 0]}
      bg={["muted", "muted", "background"]}
    >
      <LabelCentered htmlFor="partValue">Valeur de</LabelCentered>
      <Input
        id="partValue"
        type="number"
        value={partValue}
        onChange={e => setPartValue(e.currentTarget.valueAsNumber)}
      />
      <LabelCentered htmlFor="totalValue">sur un total de </LabelCentered>
      <Input
        id="totalValue"
        type="number"
        value={totalValue}
        onChange={e => setTotalValue(e.currentTarget.valueAsNumber)}
      />
      <LabelCentered htmlFor="result-percent"> donne </LabelCentered>
      <Output id="result-percent">{result} %</Output>
    </Grid>
  );
}

function ExtractPercentGap() {
  const [initialValue, setInitialValue] = useState(100);
  const [finalValue, setFinalValue] = useState(120);

  const result = useMemo(() => {
    const init = new BigNumber(initialValue);
    const final = new BigNumber(finalValue);

    const diff = final.minus(init);
    return prettyPrintNumber(diff.div(init).times(new BigNumber(100)));
  }, [initialValue, finalValue]);

  return (
    <Grid
      gap={5}
      columns={[2, 2, 6]}
      p={[3, 3, 0]}
      bg={["muted", "muted", "background"]}
    >
      <LabelCentered htmlFor="initialValue">valeur initiale</LabelCentered>
      <Input
        id="initialValue"
        type="number"
        value={initialValue}
        onChange={e => setInitialValue(e.currentTarget.valueAsNumber)}
      />
      <LabelCentered htmlFor="finalValue">valeur finale</LabelCentered>
      <Input
        id="finalValue"
        type="number"
        value={finalValue}
        onChange={e => setFinalValue(e.currentTarget.valueAsNumber)}
      />
      <LabelCentered htmlFor="result-percent-gap"> donne </LabelCentered>
      <Output id="result-percent-gap">{result} %</Output>
    </Grid>
  );
}

function App() {
  const [colorMode, setColorMode] = useColorMode();

  const nextMode = colorMode === "default" ? "dark" : "default";
  const nextModeLabel = colorMode === "default" ? "sombre" : "clair";
  return (
    <div>
      <Box
        bg="muted"
        marginBottom={5}
        p={3}
        sx={{
          backgroundColor: "muted",
          backgroundImage: `url(
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12' viewBox='0 0 20 12'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='charlie-brown' fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M9.8 12L0 2.2V.8l10 10 10-10v1.4L10.2 12h-.4zm-4 0L0 6.2V4.8L7.2 12H5.8zm8.4 0L20 6.2V4.8L12.8 12h1.4zM9.8 0l.2.2.2-.2h-.4zm-4 0L10 4.2 14.2 0h-1.4L10 2.8 7.2 0H5.8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
          )`
        }}
      >
        <Flex sx={{ alignItems: "center" }}>
          <Heading as="h1">Calcul pourcentage</Heading>
          <Button ml="auto" onClick={() => setColorMode(nextMode)}>
            {nextModeLabel}
          </Button>
        </Flex>
      </Box>
      <Grid width={[null]} gap={4} p={3}>
        <ExtractValue />
        <hr />
        <ExtractPercent />
        <hr />
        <ExtractPercentGap />
      </Grid>
    </div>
  );
}

export default function Root() {
  return (
    <Theme>
      <App />
    </Theme>
  );
}
