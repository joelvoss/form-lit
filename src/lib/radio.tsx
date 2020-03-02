/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { useForm } from './form';
import { IRadioProps } from '../types';
import { getRequiredElement } from '../utils';

const container = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 1.3rem;

  &[data-disabled='true'] * {
    cursor: not-allowed;
  }
`;

const textContainer = css`
  display: inline-block;
`;

const title = css`
  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
  font-size: 0.875rem;
  margin-left: 3px;
  margin-bottom: 3px;
`;

const req = css`
  display: inline-block;
  color: rgb(255, 89, 83);
  margin-top: 2px; /* corresponds to input margin */
  margin-left: 0.5em;
  font-size: 0.75rem;
  text-transform: initial;
  font-weight: 400;
`;

const input = css`
  border-radius: 3px;
  border: 1px solid #dcdcdc;
  font-size: 16px;
  line-height: 0;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  outline: none;
  appearance: none;
  width: 1em;
  height: 1em;
  margin: 2px;
  border-radius: 100%;

  &:focus {
    border-color: rgb(59, 153, 253);
  }

  &[data-input-error='true'] {
    border-color: rgb(255, 89, 83);
  }

  &:checked {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 32 32'%3E%3Cpath fill='%232086FF' d='M0 0h32v32H0z'/%3E%3Ccircle cx='16' cy='17' r='7' fill='%231D74E5'/%3E%3Ccircle cx='16' cy='16' r='7' fill='%23fff'/%3E%3C/svg%3E");
    background-size: contain;
  }
`;

const error = css`
  display: block;
  font-size: 0.875rem;
  color: rgb(255, 89, 83);
  margin-left: 3px;
  margin-bottom: 3px;
`;

const helptext = css`
  display: block;
  font-size: 0.875rem;
  margin-left: 3px;
  color: #777;
`;

export const Radio: React.FC<IRadioProps> = ({
  label,
  name,
  value,
  defaultChecked,
  required,
  validator,
  children,
  className,
  disabled,
  ...rest
}) => {
  const [binds, err] = useForm({
    name,
    defaultValue: value,
    defaultChecked,
    required,
    validator,
  });

  return (
    <div
      css={container}
      className={className}
      data-disabled={disabled}
      data-form-lit-radio-container
    >
      <input
        id={`${name}.${value}`}
        css={input}
        type="radio"
        data-input-error={!!err}
        required={required}
        disabled={disabled}
        {...rest}
        {...binds}
        data-form-lit-radio-input
      />
      <div css={textContainer} data-form-lit-radio-textcontainer>
        <label
          css={title}
          htmlFor={`${name}.${value}`}
          data-form-lit-radio-title
        >
          {label}
          {required && (
            <span css={req} data-form-lit-radio-req>
              {getRequiredElement(required)}
            </span>
          )}
        </label>

        {err && (
          <span css={error} data-form-lit-radio-error>
            {err}
          </span>
        )}
        <span css={helptext} data-form-lit-radio-helptext>
          {children}
        </span>
      </div>
    </div>
  );
};
Radio.displayName = `Radio`;
