/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { useForm } from './form';
import { getRequiredElement } from '../utils';
import { ICheckboxProps } from '../types';

const container = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 1.3rem;
`;

const textContainer = css`
  display: inline-block;
`;

const title = css`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
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
  border-radius: 3px;
  border: 1px solid #dcdcdc;
  font-size: 16px;
  box-shadow: inset 0 1px 2px #efefef;

  &:focus,
  &:active {
    border-color: rgb(59, 153, 253);
  }

  &[data-input-error='true'] {
    border-color: rgb(255, 89, 83);
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

export const Checkbox: React.FC<ICheckboxProps> = ({
  label,
  name,
  value,
  defaultChecked,
  required,
  validator,
  children,
  className,
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
    <div css={container} className={className} data-form-lit-checkbox-container>
      <input
        id={name}
        css={input}
        type="checkbox"
        data-input-error={!!err}
        required={required}
        {...rest}
        {...binds}
        data-form-lit-checkbox-input
      />
      <div css={textContainer} data-form-lit-checkbox-textcontainer>
        <label css={title} htmlFor={name} data-form-lit-checkbox-title>
          {label}
          {required && (
            <span css={req} data-form-lit-checkbox-req>
              {getRequiredElement(required)}
            </span>
          )}
        </label>

        {err && (
          <span css={error} data-form-lit-checkbox-error>
            {err}
          </span>
        )}
        <span css={helptext} data-form-lit-checkbox-helptext>
          {children}
        </span>
      </div>
    </div>
  );
};
Checkbox.displayName = `Checkbox`;
