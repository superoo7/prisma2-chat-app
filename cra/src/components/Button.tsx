import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";
import { typeScale, primaryFont, defaultTheme } from "../utils";

interface ButtonProps {
  theme: typeof defaultTheme;
}

export const BUTTON_MODIFIERS = {
  small: () => `
  padding: 8px;
  font-size: ${typeScale.helperText};
  `,
  large: () => `
  padding: 16px 24px;
  font-size: ${typeScale.header5};
  `,
  warning: ({ theme }: ButtonProps) => `
    background-color: ${theme.status.warningColor};
    color: ${theme.textColorInverted};
    &:hover, &:focus {
      background-color: ${theme.status.warningColorHover};
    }
    &:active {
      background-color: ${theme.status.warningColorActive};
    }
  `,
  error: ({ theme }: ButtonProps) => `
  background-color: ${theme.status.errorColor};
  color: ${theme.textColorInverted};
  &:hover {
    background-color: ${theme.status.errorColorHover};
  }
  &:active {
    background-color: ${theme.status.errorColorActive};
  }
  `,
  success: ({ theme }: ButtonProps) => `
  background-color: ${theme.status.successColor};
  color: ${theme.textColorInverted};
  &:hover {
    background-color: ${theme.status.successColorHover};
  }
  &:active {
    background-color: ${theme.status.successColorActive};
  }
  `,
};

export const Button = styled.button<ButtonProps>`
  padding: 8px 12px;
  border-radius: 2px;
  min-width: 100px;
  cursor: pointer;
  font-family: ${primaryFont};
  font-size: ${typeScale.paragraph};
  transition: background-color 0.2s linear, color 0.2s linear;
  &:hover {
    background-color: ${(props: ButtonProps) => props.theme.primaryHoverColor};
    color: ${(props: ButtonProps) => props.theme.textColorOnPrimary};
  }
  &:focus {
    outline: 3px solid ${(props: ButtonProps) => props.theme.primaryHoverColor};
    outline-offset: 2px;
  }
  &:active {
    background-color: ${(props: ButtonProps) => props.theme.primaryActiveColor};
    border-color: ${(props: ButtonProps) => props.theme.primaryActiveColor};
    color: ${(props: ButtonProps) => props.theme.textColorOnPrimary};
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${(props: ButtonProps) => props.theme.primaryColor};
  color: ${(props: ButtonProps) => props.theme.textColorOnPrimary};
  border: 2px solid transparent;
  &:disabled {
    background-color: ${(props: ButtonProps) => props.theme.disabled};
    color: ${(props: ButtonProps) => props.theme.textOnDisabled};
    cursor: not-allowed;
  }
  ${applyStyleModifiers(BUTTON_MODIFIERS) as any};
`;

export const SecondaryButton = styled(Button)`
  border: 2px solid ${(props: ButtonProps) => props.theme.primaryColor};
  background: none;
  color: ${(props: ButtonProps) => props.theme.primaryColor};
  &:disabled {
    background: none;
    border: 2px solid ${(props: ButtonProps) => props.theme.disabled};
    color: ${(props: ButtonProps) => props.theme.disabled};
    cursor: not-allowed;
  }
  ${applyStyleModifiers(BUTTON_MODIFIERS) as any};
`;

export const TertiaryButton = styled(Button)`
  background: none;
  border: 2px solid transparent;
  color: ${(props: ButtonProps) => props.theme.primaryColor};
  &:disabled {
    color: ${(props: ButtonProps) => props.theme.disabled};
    cursor: not-allowed;
  }
  ${applyStyleModifiers(BUTTON_MODIFIERS) as any};
`;
