/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { useForm } from './form';
import { ISelectProps } from '../types';
import { getRequiredElement } from '../utils';

const container = css`
  display: block;
  margin-bottom: 1.3rem;
`;

const title = css`
  display: flex;
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

const selectContainer = css`
  position: relative;
  margin-bottom: 3px;
`;

const select = css`
  width: 100%;
  font-size: 16px;
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  box-shadow: inset 0 1px 2px #efefef;
  padding: 0.25rem 1.5rem 0.25rem 0.5rem;
  appearance: none;
  outline: none;

  &:focus {
    border-color: rgb(59, 153, 253);
  }

  &[multiple] {
    padding: 0.25rem 0.5rem;
  }
`;

const chevron = css`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0.25rem;
  pointer-events: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > svg {
    width: 1rem;
    height: 1rem;
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

export const Select: React.FC<ISelectProps> = ({
  label,
  name,
  defaultValue,
  multiple,
  required,
  validator,
  children,
  className,
  options,
  ...rest
}) => {
  // Make sure to select the first option if only one was provided
  if (!defaultValue && options?.length === 1) {
    defaultValue = options[0].value;
  }

  const [binds, err] = useForm({
    name,
    defaultValue,
    required,
    multiple,
    validator,
  });

  return (
    <div css={container} className={className} data-form-lit-select-container>
      <label css={title} htmlFor={name} data-form-lit-select-title>
        {label}
        {required && (
          <span css={req} data-form-lit-select-req>
            {getRequiredElement(required)}
          </span>
        )}
      </label>

      <div css={selectContainer} data-form-lit-select-selectcontainer>
        <select
          id={name}
          css={select}
          multiple={multiple}
          {...rest}
          {...binds}
          data-form-lit-select-select
        >
          {options &&
            options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
        </select>
        {!multiple && (
          <div css={chevron} data-form-lit-select-chevron>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
            </svg>
          </div>
        )}
      </div>

      {err && (
        <span css={error} data-form-lit-select-error>
          {err}
        </span>
      )}
      <span css={helptext} data-form-lit-select-helptext>
        {children}
      </span>
    </div>
  );
};
Select.displayName = `Select`;
