import React from 'react';
import produce from 'immer';
import {
  IFormCtx,
  IFormProps,
  IFormState,
  IFormHookState,
  TFormHookResult,
  IFormHookProps,
  TValidatorReturn,
} from '../types';
import { normalizeFormData, ensureArray, requiredValidator } from '../utils';

/**
 * Our form context where all formfields will be registered in
 */
const FormContext = React.createContext<IFormCtx>({
  formBag: {},
  state: {
    error: null,
    success: false,
    isSubmitting: false,
  },
  handleUpdate: () => {},
});

/**
 * <Form /> provides our `FormContext` and submit/update functions to hook
 * into
 */
export const Form: React.FC<IFormProps> = React.forwardRef(
  ({ onSubmit, onChange, className, children }, ref) => {
    const formBag = React.useRef<{ [key: string]: any }>({});
    const [state, setState] = React.useState<IFormState>({
      error: null,
      success: false,
      isSubmitting: false,
    });

    // Handle the form submit
    const handleSubmit = async (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      setState(
        produce(d => {
          d.isSubmitting = true;
        }),
      );

      // Touch each field and validate it
      let error: TValidatorReturn = null;
      let fieldToFocus = null;
      for (let key in formBag.current) {
        fieldToFocus = formBag.current[key];
        error = fieldToFocus.validate(
          {
            value: fieldToFocus.value,
            checked: fieldToFocus.checked,
            files: fieldToFocus.files,
          },
          true,
        );

        // If there was an error, break the loop
        if (error) break;
      }

      // If there was an error, set it and focus the field that has the error
      if (error) {
        setState(
          produce(d => {
            d.error = error;
            d.success = false;
            d.isSubmitting = false;
          }),
        );
        fieldToFocus.el.focus();
      } else if (typeof onSubmit === 'function') {
        // Normalize form data
        const normalized = normalizeFormData(formBag.current);
        await onSubmit(normalized);
        setState(
          produce(d => {
            d.error = false;
            d.success = true;
            d.isSubmitting = false;
          }),
        );
      }

      return Promise.resolve();
    };

    // Handle a form reset.
    const handleReset = (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      for (let key in formBag.current) {
        formBag.current[key].reset();
      }
      setState({
        error: null,
        success: false,
        isSubmitting: false,
      });
    };

    // Handle form field updates
    const handleUpdate = (name: string, value: any) => {
      if (typeof onChange === 'function') {
        onChange(name, value);
      }
    };

    return (
      <form
        ref={ref}
        className={className}
        onSubmit={handleSubmit}
        onReset={handleReset}
        data-form-lit-form
      >
        <FormContext.Provider
          value={{ formBag: formBag.current, state, handleUpdate }}
        >
          {children}
        </FormContext.Provider>
      </form>
    );
  },
);
Form.displayName = `Form`;

/**
 * Helper function to extract relevant data from a onChange or onBlur event
 */
function getDataFromEvent(
  evt: React.SyntheticEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
  state: IFormHookState,
) {
  // Return current values set in state on blur
  if (evt.type === 'blur') {
    return {
      value: state.value,
      checked: state.checked,
      files: state.files,
    };
  }

  const target = evt.target as HTMLInputElement &
    HTMLTextAreaElement &
    HTMLSelectElement;

  let value = target.value as string | string[];

  // Handle select-one and select-multiple field types
  if (target.options) {
    value = Array.from(target.options)
      .filter(o => o.selected)
      .map(o => o.value);

    // If we only have one option selected and its not a multi-select, unwrap
    // the array
    if (value.length === 1 && !target.multiple) {
      value = value[0];
    }
  }

  // Handle radio/checkbox inputs
  const checked = target.checked;

  // Handle file inputs
  const files = target.files;
  return { value, checked, files };
}

/**
 * useForm registers single fields in <Form /> and exposes the necessary
 * bindings/state for the field it's been used in
 */
export function useForm({
  name,
  defaultValue,
  defaultChecked,
  required = false,
  multiple = false,
  validator,
}: IFormHookProps): TFormHookResult {
  const ref = React.useRef<
    HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement
  >(null);
  const { formBag, handleUpdate } = React.useContext(FormContext);
  const [state, setState] = React.useState<IFormHookState>({
    value: multiple
      ? ensureArray(defaultValue)
      : defaultValue
      ? defaultValue
      : '',
    checked: defaultChecked || false,
    files: null,
    error: null,
    touched: false,
  });

  // Field validate function
  const validate = React.useCallback(
    (value, forceTouched = false) => {
      // Call the validator and set error state
      let error: TValidatorReturn = null;

      if (required) {
        error = requiredValidator(
          value,
          (ref.current as HTMLInputElement &
            HTMLTextAreaElement &
            HTMLSelectElement).type,
        );
      }

      if (typeof validator === 'function' && !error) {
        error = validator(value, name, formBag);
      }

      if (error) {
        setState(
          produce(d => {
            d.error = error;
            // Force touched state if necessary
            if (forceTouched) {
              d.touched = true;
            }
          }),
        );

        return error;
      } else {
        setState(
          produce(d => {
            d.error = false;
          }),
        );
        return null;
      }
    },
    [name, required, validator, formBag],
  );

  // Field reset function
  const reset = React.useCallback(() => {
    setState(
      produce(d => {
        d.value = multiple
          ? ensureArray(defaultValue)
          : defaultValue
          ? defaultValue
          : '';
        d.checked = defaultChecked || false;
        d.files = null;
        d.error = null;
        d.touched = false;
      }),
    );
  }, [defaultValue, defaultChecked, multiple]);

  // Sync field state with formBag
  React.useEffect(() => {
    const el = ref.current;
    if (el) {
      if (el.type === 'radio') {
        formBag[`${name}.${state.value}`] = {
          el,
          validate,
          reset,
          type: el.type,
          ...state,
        };
      } else {
        formBag[name] = { el, validate, reset, type: el.type, ...state };
      }
    }
    return () => {
      delete formBag[name];
    };
  }, [name, reset, validate, state, formBag]);

  // Handle onChange events
  const onChange = (
    evt: React.SyntheticEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { value, checked, files } = getDataFromEvent(evt, state);
    setState(
      produce(d => {
        d.value = value;
        d.checked = checked;
        d.files = files;
      }),
    );
    validate({ value, checked, files });
    handleUpdate(
      (evt.target as HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement)
        .name,
      {
        value,
        checked,
        files,
      },
    );
  };

  // Handle onBlur events
  const onBlur = (
    evt: React.SyntheticEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setState(
      produce(d => {
        if (!d.touched) {
          d.touched = true;
        }
      }),
    );
    const { value, checked, files } = getDataFromEvent(evt, state);
    validate({ value, checked, files });
  };

  return [
    {
      ref,
      onChange,
      onBlur,
      name,
      defaultChecked: state.checked,
      value: state.value,
      files: state.files,
    },
    state.error,
  ];
}
