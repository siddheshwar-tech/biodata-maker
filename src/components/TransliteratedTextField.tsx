import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { IndicTransliterate } from "@ai4bharat/indic-transliterate";

interface Props extends Omit<TextFieldProps, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  lang: string;
}

const TransliteratedTextField: React.FC<Props> = ({
  value,
  onChange,
  lang,
  ...props
}) => {
  // Only enable transliteration for Marathi/Hindi
  // const enableIME = lang === "mr" || lang === "hi";
  const enableIME = "mr";

  if (!enableIME) {
    return (
      <TextField
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <IndicTransliterate
      lang={lang}
      value={value}
      onChangeText={(text: string) => onChange(text)}
      renderComponent={(inputProps: any) => (
        <TextField {...props} {...inputProps} value={value} />
      )}
    />
  );
};

export default TransliteratedTextField;