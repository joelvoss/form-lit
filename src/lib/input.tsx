/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { useForm } from './form';
import { getRequiredElement } from '../utils';
import { IInputProps } from '../types';

const container = css`
  display: block;
  margin-bottom: 1.3rem;
`;

const title = css`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  font-size: 0.875rem;
  margin-left: 3px;
  margin-bottom: 3px;
`;

const req = css`
  display: inline-block;
  color: rgb(255, 89, 83);
  margin-left: 0.5em;
  font-size: 0.75rem;
  text-transform: initial;
  font-weight: 400;
`;

const input = css`
  width: 100%;
  border-radius: 3px;
  border: 1px solid #dcdcdc;
  padding: 0.25rem 0.5rem;
  margin-bottom: 3px;
  font-size: 16px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  outline: none;

  &:focus {
    border-color: rgb(59, 153, 253);
  }

  &[data-input-error='true'] {
    border-color: rgb(255, 89, 83);
  }

  &[disabled] {
    background-color: rgb(250, 250, 250);
    cursor: not-allowed;
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

export const Input: React.FC<IInputProps> = ({
  type = 'text',
  label,
  name,
  defaultValue,
  required,
  validator,
  children,
  className,
  ...rest
}) => {
  const [binds, err] = useForm({
    name,
    defaultValue: defaultValue && String(defaultValue),
    required,
    validator,
  });

  return (
    <label
      css={container}
      className={className}
      htmlFor={name}
      data-form-lit-input-container
    >
      <span css={title} data-form-lit-input-title>
        {label}
        {required && (
          <span css={req} data-form-lit-input-req>
            {getRequiredElement(required)}
          </span>
        )}
      </span>
      <input
        id={name}
        css={input}
        type={type}
        required={required}
        data-input-error={!!err}
        {...rest}
        {...binds}
        data-form-lit-input-input
      />
      {err && (
        <span css={error} data-form-lit-input-error>
          {err}
        </span>
      )}
      <span css={helptext} data-form-lit-input-helptext>
        {children}
      </span>
    </label>
  );
};
Input.displayName = `Input`;
