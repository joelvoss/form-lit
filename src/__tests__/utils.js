import React from 'react';
import {
  normalizeFormData,
  isFalsy,
  requiredValidator,
  ensureArray,
  getRequiredElement,
} from '../utils';

test(`normalizeFormData`, () => {
  const formData = {
    'field-0': {
      type: 'checkbox',
      value: '',
    },
    'field-1': {
      type: 'checkbox',
      value: 'opt-1',
    },
    // ---------------
    'field-2': {
      type: 'radio',
      value: '',
      el: { checked: false },
    },
    'field-3': {
      type: 'radio',
      value: '',
      el: { checked: true },
    },
    'field-4': {
      type: 'radio',
      value: 'opt-1',
      el: { checked: false },
    },
    'field-5': {
      type: 'radio',
      value: 'opt-1',
      el: { checked: true },
    },
    // ---------------
    'field-6': {
      type: 'file',
      el: { files: null },
    },
    'field-7': {
      type: 'file',
      el: { files: [] },
    },
    'field-8': {
      type: 'file',
      el: { files: ['file-1'] },
    },
    // ---------------
    'field-9': {
      type: 'range',
      value: '',
    },
    'field-10': {
      type: 'range',
      value: '10',
    },
    // ---------------
    'field-12': {
      type: 'textarea',
      value: '',
    },
    'field-13': {
      type: 'textarea',
      value: '_marked_',
    },
    // ---------------
    'field-14': {
      type: 'select-one',
      value: '',
    },
    'field-15': {
      type: 'select-one',
      value: [],
    },
    'field-16': {
      type: 'select-one',
      value: [''],
    },
    'field-17': {
      type: 'select-multiple',
      value: '',
    },
    'field-18': {
      type: 'select-multiple',
      value: [],
    },
    'field-19': {
      type: 'select-multiple',
      value: ['opt-1', 'opt-2'],
    },
    // ---------------
    'field-20': {
      type: 'text',
      value: '',
    },
    'field-21': {
      type: 'text',
      value: ' ',
    },
    'field-22': {
      type: 'text',
      value: 'text-21',
    },
  };
  expect(normalizeFormData(formData)).toEqual({
    'field-0': 'on',
    'field-1': 'opt-1',
    'field-10': 10,
    'field-13': `<p><em>marked</em></p>\n`,
    'field-16': [''],
    'field-19': ['opt-1', 'opt-2'],
    'field-5': 'opt-1',
    'field-8': ['file-1'],
    'field-22': 'text-21',
  });
});

test(`isFalsy checks if a value is falsy`, () => {
  expect(isFalsy()).toBe(true);
  expect(isFalsy(null)).toBe(true);
  expect(isFalsy(undefined)).toBe(true);
  expect(isFalsy(void 0)).toBe(true);
  expect(isFalsy(false)).toBe(true);
  expect(isFalsy(' ')).toBe(true);
  expect(isFalsy([])).toBe(true);
  expect(isFalsy(true)).toBe(false);
  expect(isFalsy(0)).toBe(false);
  expect(isFalsy(NaN)).toBe(false);
});

test(`requiredValidator checks if a field fulfills the required condition`, () => {
  const regexes = {
    checkbox: /Please select this field/i,
    file: /Please choose one or more files/i,
    range: /Please select a number in this range/i,
    'select-multiple': /Please choose on or more options/i,
    other: /Please fill in this field/i,
  };
  expect(requiredValidator({ checked: false }, 'checkbox')).toMatch(
    regexes.checkbox,
  );
  expect(requiredValidator({ checked: true }, 'checkbox')).toBeNull();
  expect(requiredValidator({ files: false }, 'file')).toMatch(regexes.file);
  expect(requiredValidator({ files: [] }, 'file')).toMatch(regexes.file);
  expect(requiredValidator({ files: ['true'] }, 'file')).toBeNull();
  expect(requiredValidator({ value: null }, 'range')).toMatch(regexes.range);
  expect(requiredValidator({ value: 0 }, 'range')).toBeNull();
  expect(requiredValidator({ value: null }, 'select-multiple')).toMatch(
    regexes['select-multiple'],
  );
  expect(requiredValidator({ value: [] }, 'select-multiple')).toMatch(
    regexes['select-multiple'],
  );
  expect(requiredValidator({ value: ['true'] }, 'select-multiple')).toBeNull();
  expect(requiredValidator({ value: ' ' }, 'text')).toMatch(regexes.other);
  expect(requiredValidator({ value: null }, 'text')).toMatch(regexes.other);
  expect(requiredValidator({ value: 'true' }, 'text')).toBeNull();
});

test(`ensureArray to always wrap the input in an array`, () => {
  expect(ensureArray()).toEqual([]);
  expect(ensureArray('test')).toEqual(['test']);
  expect(ensureArray(['test'])).toEqual(['test']);
});

test(`getRequiredElement to return the correct required string or element`, () => {
  expect(getRequiredElement()).toEqual(`(Required)`);
  expect(getRequiredElement(false)).toEqual(`(Required)`);
  expect(getRequiredElement('Test-Req')).toEqual(`Test-Req`);

  const Component = <p>Required</p>;
  expect(getRequiredElement(Component)).toEqual(<p>Required</p>);
});
