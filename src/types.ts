import { MutableRefObject } from 'react';

export type Modify<T, R> = Omit<T, keyof R> & R;

export enum FormFieldTypes {
  Text = 'text',
  Password = 'password',
  Number = 'number',
  Email = 'email',
  Checkbox = 'checkbox',
  Radio = 'radio',
  File = 'file',
  Range = 'range',
  Textarea = 'textarea',
  SelectOne = 'select-one',
  SelectMultiple = 'select-multiple',
}

//  Validator types & interfaces

export type TValidatorValue = {
  value: any;
  checked: boolean;
  files: FileList | null;
};

export type TValidatorType = FormFieldTypes | string;

export type TValidatorReturn = string | null | undefined;

export interface IValidator {
  (
    value: TValidatorValue,
    type?: TValidatorType,
    formBag?: TFormBag,
  ): TValidatorReturn;
}

// Form types & interfaces
export type TFormBag<T = any> = T;

export interface IFormCtx {
  formBag: TFormBag;
  state: IFormState;
  handleUpdate: (name: string, value: any) => void;
}

export interface IFormProps {
  onSubmit?: (form: TFormBag) => Promise<any> | void;
  onChange?: (name: string, value: any) => void;
  className?: string;
  children?: any;
  ref?: MutableRefObject<any>;
}

export interface IFormState {
  error: string | null;
  success: boolean;
  isSubmitting: boolean;
}

// useForm types and interfaces

export interface IFormHookProps {
  name: FormFieldTypes | string;
  defaultValue?: any;
  defaultChecked?: boolean;
  required?: boolean | string | any;
  multiple?: boolean;
  validator?: IValidator;
}

export interface IFormHookState {
  value: any;
  checked: boolean;
  files: FileList | null;
  error: any | null;
  touched: boolean;
}

export type TFormHookResult = [
  {
    ref: React.MutableRefObject<
      (HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement) | null
    >;
    onChange: (
      evt: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => void;
    onBlur: (
      evt: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => void;
    name: string;
    defaultChecked: boolean;
    value: any;
    files: FileList | null;
  },
  any | null,
];

// Field component types & unterfaces

interface IBaseFieldProps {
  name: string;
  label?: string;
  required?: any | boolean | string;
  validator?: IValidator;
  children?: string | JSX.Element | (string | JSX.Element)[];
  className?: string;
}

export interface IInputProps extends IBaseFieldProps {
  type: string;
  defaultValue?: string;
  placeholder?: string;
  autoComplete?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface ICheckboxProps extends IBaseFieldProps {
  value?: any;
  defaultChecked?: boolean;
}

export interface IFileProps extends IBaseFieldProps {}

export interface IRadioProps extends IBaseFieldProps {
  value?: any;
  defaultChecked?: boolean;
}

export interface IRangeProps extends IBaseFieldProps {
  defaultValue?: string;
  datalist?: { value: number; label?: string | any; pipe?: boolean }[];
  min?: number;
  max?: number;
  step?: number;
}

export interface ITextareaProps extends IBaseFieldProps {
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
}

export interface ISelectProps extends IBaseFieldProps {
  defaultValue?: string;
  multiple?: boolean;
  options?: { value: string; label: string }[];
}
