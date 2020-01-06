/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { useForm } from './form';
import { IRangeProps } from '../types';
import { getRequiredElement } from '../utils';

const container = css`
  display: block;
  margin-bottom: 1.3rem;

  &[data-disabled='true'] * {
    cursor: not-allowed;
  }
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

const flex = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 3px;
`;

const rangeContainer = css`
  flex: 1;
  margin-right: 1em;
`;

const datalistContainer = css`
  display: flex;
  margin: 0 auto;
  width: calc(100% - 20px);
`;

const datalistItem = css`
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 0px;
  height: 1.25em;
`;

const datalistLabel = css`
  position: absolute;
  bottom: 0.55em;
  left: 0;
  font-size: 0.75em;
  transform: translateX(-50%);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &[data-disabled='true']:hover {
    text-decoration: none;
  }
`;

const datalistPipe = css`
  display: block;
  width: 1px;
  height: 0.5em;
  background: #777;
  position: absolute;
  left: 1px;
  bottom: 0;
`;

const range = css`
  width: 100%;
  font-size: 16px;
`;

const input = css`
  flex: 0 1 0%;
  min-width: 3.5rem;
  border-radius: 3px;
  border: 1px solid #dcdcdc;
  padding: 0.25rem 0.5rem;
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

export const Range: React.FC<IRangeProps> = ({
  label,
  name,
  defaultValue,
  required,
  validator,
  children,
  className,
  datalist,
  disabled,
  min = 0,
  max = 100,
  step = 1,
  ...rest
}) => {
  const [binds, err] = useForm({
    name,
    defaultValue: defaultValue && String(defaultValue),
    required,
    validator,
  });

  const handleDataListClick = (value: number) => {
    if (!disabled && binds.ref.current) {
      // Get the native input value setter from the window.HTMLInputElement
      // prototype
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )!.set;
      // Change the value using our native input value setter and dispatch a
      // generic onchange event so react can pick it up
      nativeInputValueSetter!.call(binds.ref.current, value);
      binds.ref.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  return (
    <label
      css={container}
      className={className}
      htmlFor={name}
      data-disabled={disabled}
      data-form-lit-range-container
    >
      <span css={title} data-form-lit-range-title>
        {label}
        {required && (
          <span css={req} data-form-lit-range-req>
            {getRequiredElement(required)}
          </span>
        )}
      </span>
      <div css={flex} data-form-lit-range-flex>
        <div css={rangeContainer} data-form-lit-rangecontainer>
          {/* If there is a datalist, render it above the input */}
          {datalist && (
            <div css={datalistContainer} data-form-lit-range-datalistcontainer>
              {datalist.map(data => {
                return (
                  <div
                    key={data.value}
                    css={datalistItem}
                    style={{
                      left: `${(data.value / max) * 100}%`,
                    }}
                    onClick={() => handleDataListClick(data.value)}
                    data-form-lit-range-datalistitem
                  >
                    {data.label && (
                      <span
                        css={datalistLabel}
                        data-disabled={disabled}
                        data-form-lit-range-datalistlabel
                      >
                        {data.label}
                      </span>
                    )}
                    {data.pipe !== false && (
                      <span
                        css={datalistPipe}
                        data-form-lit-range-datalistpipe
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
          <input
            id={name}
            css={range}
            type="range"
            required={required}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            {...rest}
            {...binds}
            data-form-lit-range-range
          />
        </div>
        <input
          type="number"
          css={input}
          value={binds.value}
          onChange={evt => binds.onChange(evt)}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          data-input-error={!!err}
          data-form-lit-range-input
        />
      </div>
      {err && (
        <span css={error} data-form-lit-range-error>
          {err}
        </span>
      )}
      <span css={helptext} data-form-lit-range-helptext>
        {children}
      </span>
    </label>
  );
};
Range.displayName = `Range`;
