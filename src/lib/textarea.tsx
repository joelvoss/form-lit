/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { useForm } from './form';
import marked from 'marked';
import { ITextareaProps } from '../types';
import { getRequiredElement } from '../utils';

const container = css`
  display: block;
  margin-bottom: 1.3rem;

  &[data-disabled='true'] * {
    cursor: not-allowed;
  }
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

const input = css`
  display: block;
  width: 100%;
  border-radius: 3px;
  border: 1px solid #dcdcdc;
  padding: 0.5rem 0.5rem;
  font-size: 16px;
  font-family: inherit;
  box-shadow: inset 0 1px 2px #efefef;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: rgb(59, 153, 253);
  }

  &[data-input-error='true'] {
    border-color: rgb(255, 89, 83);
  }

  &:disabled {
    background-color: rgb(250, 250, 250);
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

const inner = css`
  position: relative;
  margin-bottom: 3px;
`;

const tabsContainer = css`
  position: absolute;
  right: calc(1rem + 1px);
  bottom: 1px;
`;

const tabs = css`
  background-color: white;
  border: 1px solid transparent;
  appearance: none;
  border-radius: 0;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  cursor: pointer;
  outline: none;

  &[data-tab-active='true'] {
    background-color: #efefef;
  }
`;

const preview = css`
  border: 1px solid #dcdcdc;
  font-size: 16px;
  font-family: inherit;
  box-shadow: inset 0 1px 2px #efefef;
  padding: 0.5rem 0.5rem;
  border-radius: 3px;

  & p {
    margin: 0 0 0.5em 0;
  }
`;

export const Textarea: React.FC<ITextareaProps> = ({
  label,
  name,
  defaultValue,
  required,
  validator,
  children,
  className,
  disabled,
  rows = 3.5,
  ...rest
}) => {
  const [binds, err] = useForm({
    name,
    defaultValue: defaultValue && String(defaultValue),
    required,
    validator,
  });

  const markedValue = React.useMemo(() => marked(binds.value), [binds.value]);
  const [tab, setTab] = React.useState('text');
  const [textContainerHeight, setTextContainerHeight] = React.useState(
    rows * 16,
  );

  const changeTab = (
    evt: React.SyntheticEvent<HTMLButtonElement>,
    name: string,
  ) => {
    evt.preventDefault();
    if (disabled) return;
    // Save the current <textarea> height so both <textarea> and the preview
    // <div> share the same height.
    // We do this only when switching to the preview tab, otherwise the
    // height of the <textare> would be 0 because it's not beeing rendered
    if (name === 'preview' && binds.ref.current) {
      setTextContainerHeight(binds.ref.current.offsetHeight);
    }
    setTab(name);
  };

  return (
    <label
      css={container}
      className={className}
      htmlFor={name}
      data-disabled={disabled}
      data-form-lit-textarea-container
    >
      <span css={title}>
        {label}
        {required && (
          <span css={req} data-form-lit-textarea-req>
            {getRequiredElement(required)}
          </span>
        )}
      </span>
      <div css={inner} data-form-lit-textarea-inner>
        <div css={tabsContainer} data-form-lit-textarea-tabscontainer>
          <button
            css={tabs}
            onClick={evt => changeTab(evt, 'text')}
            tabIndex={-1}
            data-tab-active={tab === 'text'}
            data-form-lit-textarea-tabs
          >
            Raw
          </button>
          <button
            css={tabs}
            onClick={evt => changeTab(evt, 'preview')}
            tabIndex={-1}
            data-tab-active={tab === 'preview'}
            data-form-lit-textarea-tabs
          >
            Preview
          </button>
        </div>
        {tab === 'text' && (
          <textarea
            id={name}
            css={input}
            required={required}
            disabled={disabled}
            {...rest}
            {...binds}
            style={{ height: textContainerHeight || 'auto' }}
            data-form-lit-textarea-input
          />
        )}
        {tab === 'preview' && (
          <div
            css={preview}
            style={{ minHeight: textContainerHeight || 'auto' }}
            dangerouslySetInnerHTML={{ __html: markedValue }}
            data-form-lit-textarea-preview
          />
        )}
      </div>
      {err && (
        <span css={error} data-form-lit-textarea-error>
          {err}
        </span>
      )}
      <span css={helptext} data-form-lit-textarea-helptext>
        {children}
      </span>
    </label>
  );
};
Textarea.displayName = `Textarea`;
