import React from 'react';
import marked from 'marked';
import { IValidator, FormFieldTypes } from './types';

/**
 * normalizeFormData normalizes the data of multiple form field types
 */
export function normalizeFormData(data: { [key: string]: any }) {
  let normalized: { [key: string]: any } = {};
  for (let key in data) {
    const field = data[key];

    switch (field.type) {
      case FormFieldTypes.Checkbox: {
        const value = field.value.trim() || 'on';
        if (value.length) {
          normalized[key] = value;
        }
        break;
      }
      case FormFieldTypes.Radio: {
        if (field.el.checked) {
          const value = field.value.trim();
          if (value.length) {
            normalized[key] = value;
          }
        }
        break;
      }
      case FormFieldTypes.File: {
        if (field.el.files && field.el.files.length) {
          normalized[key] = field.el.files;
        }
        break;
      }
      case FormFieldTypes.Range: {
        const value = field.value.trim();
        if (value.length) {
          normalized[key] = Number(value);
        }
        break;
      }
      case FormFieldTypes.Textarea: {
        if (field.value.length) {
          normalized[key] = marked(field.value);
        }
        break;
      }
      case FormFieldTypes.SelectOne:
      case FormFieldTypes.SelectMultiple: {
        if (field.value.length) {
          normalized[key] = field.value;
        }
        break;
      }
      default: {
        const value = field.value.trim();
        if (value.length) {
          normalized[key] = value;
        }
      }
    }
  }

  return normalized;
}

/**
 * isFalsy checks if a value is falsy
 */
export function isFalsy(value: any) {
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (value === false) return true;
  if (value === null) return true;
  if (value === undefined) return true;
  if (typeof value === 'string' && value.trim().length === 0) return true;
  return false;
}

/**
 * requiredValidator is the default validator implementation that checks if
 * a given field is required or not.
 */
export const requiredValidator: IValidator = (
  { value, checked, files },
  type,
) => {
  if (type === FormFieldTypes.Checkbox) {
    return isFalsy(checked) ? `Please select this field` : null;
  } else if (type === FormFieldTypes.File) {
    return isFalsy(files) ? 'Please choose one or more files' : null;
  } else if (type === FormFieldTypes.Range) {
    return isFalsy(value) ? 'Please select a number in this range' : null;
  } else if (type === FormFieldTypes.SelectMultiple) {
    return isFalsy(value) ? 'Please choose on or more options' : null;
  } else {
    if (isFalsy(value)) {
      return `Please fill in this field`;
    }
    return null;
  }
};

/**
 * ensureArray makes sure that the given input will be returned as an array
 */
export function ensureArray(input: any | any[]) {
  if (!input) return [];
  else if (Array.isArray(input)) return input;
  else return [input];
}

/**
 * getRequiredElement returns the appropriate required element based on the
 * `required` input
 */
export function getRequiredElement(required: boolean | string | any) {
  if (typeof required === 'string' || React.isValidElement(required)) {
    return required;
  } else {
    return `(Required)`;
  }
}
