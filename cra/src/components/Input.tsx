import React from "react";
import styled from "styled-components";
import { typeScale, primaryFont, defaultTheme } from "../utils";

interface ThemeProps {
  theme: typeof defaultTheme;
}

interface InputProps {
  label: string;
  placeholder: string;
}

export const Input = styled.input`
  width: 316px;
  height: 52px;
  background-color: ${(props: ThemeProps) => props.theme.textFieldBackground};
  border: none;
  padding-left: 8px;
  font-family: ${primaryFont};
  border-radius: 2px;
  margin: 4px 0;
`;

const Label = styled.label`
  color: ${(props: ThemeProps) => props.theme.textFieldLabelColor};
  font-size: ${typeScale.helperText};
  margin-bottom: 8px;
`;

export const EmailInput = ({ label, placeholder }: InputProps) => (
  <div style={{ display: "flex", flexDirection: "column", marginTop: "16px" }}>
    <Label htmlFor="email">{label}</Label>
    <Input id="email" type="email" placeholder={placeholder} />
  </div>
);

export const PasswordInput = ({ label, placeholder }: InputProps) => (
  <div style={{ display: "flex", flexDirection: "column", marginTop: "16px" }}>
    <Label htmlFor="password">{label}</Label>
    <Input id="password" type="password" placeholder={placeholder} />
  </div>
);
