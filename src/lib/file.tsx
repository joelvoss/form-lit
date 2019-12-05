/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { useForm } from './form';
import { getRequiredElement } from '../utils';
import { IFileProps } from '../types';

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
  text-transform: uppercase;
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

const dropzone = css`
  text-align: center;
  align-items: center;
  padding: 1rem 0.5rem;
  border: 1px dashed rgb(59, 153, 253);
  border-radius: 3px;
  margin-bottom: 3px;
  font-size: 16px;
  box-shadow: inset 0 1px 2px #efefef;
  transition: background-color 0.1s ease-out;
  cursor: pointer;

  &[data-is-drag-active='true'] {
    background-color: rgba(59, 153, 253, 0.05);
  }

  &[data-input-error='true'] {
    border-color: rgb(255, 89, 83);
  }

  & p {
    padding: 0;
    font-size: 0.875em;
    pointer-events: none;
  }
`;

const dropzoneText = css`
  display: inline-block;
  margin: 0 0.5em 0 0;
`;

const dropzoneButton = css`
  display: inline-block;
  appearance: none;
  background-color: rgb(59, 153, 253);
  color: white;
  border-radius: 3px;
  border: none;
  margin: 0.5em 0;
  padding: 0.25em 0.5em;
  text-shadow: 0 0 1px #333;
  font-size: 0.875em;
`;

const input = css`
  display: none;
`;

const fileList = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0;
  font-size: 0.875rem;

  & > strong {
    color: #333;
    margin-right: 0.25em;
  }
`;

const fileListItem = css`
  color: #777;
`;

const clearButton = css`
  display: inline-block;
  appearance: none;
  background-color: #ddd;
  color: white;
  border-radius: 3px;
  border: none;
  margin: 0 0.25em;
  padding: 0.25em 0.5em;
  color: #333;
  font-size: 0.875em;
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

export const File: React.FC<IFileProps> = ({
  label,
  name,
  required,
  validator,
  children,
  className,
  ...rest
}) => {
  const [binds, err] = useForm({
    name,
    required,
    validator,
  });

  const [state, setState] = React.useState({
    isDragActive: false,
  });

  /**
   * handleDragOver tries to set the dropEffect on the dataTransfer object
   */
  const handleDragOver = React.useCallback(evt => {
    evt.preventDefault();
    evt.persist();
    evt.stopPropagation();

    if (evt.dataTransfer) {
      try {
        evt.dataTransfer.dropEffect = 'copy';
      } catch (err) {
        /* silence is golden */
      }
    }

    return false;
  }, []);

  /**
   * handleDragEnter sets the isDragActive state to true
   */
  const handleDragEnter = (evt: React.DragEvent) => {
    evt.preventDefault();
    evt.persist();
    evt.stopPropagation();

    setState(ps => ({ ...ps, isDragActive: true }));
  };

  /**
   * handleDragLeave sets the isDragActive state to false
   */
  const handleDragLeave = (evt: React.DragEvent) => {
    evt.preventDefault();
    evt.persist();
    evt.stopPropagation();

    setState(ps => ({ ...ps, isDragActive: false }));
  };

  /**
   * handleDrop sets the dropped dataTransfer.files on the hidden file input
   */
  const handleDrop = (evt: React.DragEvent) => {
    evt.preventDefault();
    evt.persist();
    evt.stopPropagation();

    setState(ps => ({ ...ps, isDragActive: false }));

    if (evt.dataTransfer && binds.ref.current) {
      // Change FileList and trigger a change event on the input
      binds.ref.current.files = evt.dataTransfer.files;
      binds.ref.current.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      console.warn('There seems to be no dataTransfer object present.');
    }
  };

  /**
   * openFileDialog opens the browsers file dialog by dispatching a click event
   * on the actual file input
   */
  const openFileDialog = () => {
    if (binds.ref.current) {
      binds.ref.current.click();
    }
  };

  /**
   * clearFilelist clears the current filelist and resets this file input
   */
  const clearFilelist = (evt: React.SyntheticEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (binds.ref.current) {
      binds.ref.current.value = '';
      binds.ref.current.files = null;
      binds.ref.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  return (
    <label
      css={container}
      className={className}
      htmlFor={name}
      data-form-lit-file-container
    >
      <span css={title} data-form-lit-file-title>
        {label}
        {required && (
          <span css={req} data-form-lit-file-req>
            {getRequiredElement(required)}
          </span>
        )}
      </span>
      <div
        css={dropzone}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        data-is-drag-active={state.isDragActive}
        data-input-error={!!err}
        data-form-lit-file-dropzone
      >
        <p css={dropzoneText} data-form-lit-file-dropzonetext>
          Drag 'n' drop files here, or
        </p>
        <button
          css={dropzoneButton}
          type="button"
          onClick={openFileDialog}
          data-form-lit-file-dropzonebutton
        >
          click to choose files.
        </button>

        {/* START Filelist */}
        {binds.files && binds.files.length !== 0 && (
          <div css={fileList} data-form-lit-file-filelist>
            <strong>Files:</strong>
            {Array.from(binds.files).map((f: File, idx: number) => {
              return (
                <span
                  key={f.name}
                  css={fileListItem}
                  data-form-lit-file-filelistitem
                >
                  {idx === binds.files!.length - 1 ? f.name : `${f.name}, `}
                </span>
              );
            })}
            <button
              css={clearButton}
              type="button"
              onClick={clearFilelist}
              data-form-lit-file-clearbutton
            >
              Clear
            </button>
          </div>
        )}
        {/* END Filelist */}
      </div>
      <input
        id={name}
        css={input}
        type="file"
        multiple
        {...rest}
        {...binds}
        data-form-lit-file-input
      />
      {err && (
        <span css={error} data-form-lit-file-error>
          {err}
        </span>
      )}
      <span css={helptext} data-form-lit-file-helptext>
        {children}
      </span>
    </label>
  );
};
File.displayName = `File`;
