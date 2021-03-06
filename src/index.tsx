import { enableES5 } from 'immer';

// Support for IE11
enableES5();

export { FormFieldTypes } from './types';
export { Form } from './lib/form';
export { Input } from './lib/input';
export { Checkbox } from './lib/checkbox';
export { Radio } from './lib/radio';
export { File } from './lib/file';
export { Range } from './lib/range';
export { Textarea } from './lib/textarea';
export { Select } from './lib/select';

export * from './types';
