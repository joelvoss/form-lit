import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  FormFieldTypes,
  Form,
  Input,
  Checkbox,
  File,
  Radio,
  Range,
  Textarea,
  Select,
} from '../src/index';

const Example = () => {
  const onSubmit = (form: any) => {
    console.log('onSubmit', form);
  };

  return (
    <div className="App">
      <Form onSubmit={onSubmit}>
        {/* START <Input /> */}
        <div className="row">
          <Input
            className="col"
            type={FormFieldTypes.Text}
            label="Default Input"
            name="default-input"
          />
        </div>
        <div className="row">
          <Input
            className="col"
            type={FormFieldTypes.Text}
            label="Input w/ placeholder"
            name="text-w-placeholder"
            placeholder="Placeholder value..."
          />
        </div>
        <div className="row">
          <Input
            className="col"
            type={FormFieldTypes.Text}
            label="Required input"
            name="text-w-req"
            required
          />
        </div>
        <div className="row">
          <Input
            className="col"
            type={FormFieldTypes.Text}
            label="Required input w/ custom required string"
            name="text-w-req-2"
            required="*"
          />
        </div>
        <div className="row">
          <Input
            className="col"
            type={FormFieldTypes.Text}
            label="Required input w/ custom required element"
            name="text-w-req-3"
            required={<span>Custom Required</span>}
          />
        </div>
        <div className="row">
          <Input
            className="col"
            type={FormFieldTypes.Text}
            label="Input w/ default value"
            name="text-w-defaultvalue"
            defaultValue="This is the defaultValue"
          />
        </div>
        <div className="row">
          <Input
            className="col"
            type={FormFieldTypes.Text}
            label="Input w/ helptext"
            name="input-w-helptext"
          >
            This is helptext as a child component.
            <br />
            <i>It can contain arbitrary html/react components</i>
          </Input>
        </div>
        <div className="row">
          <Input
            className="col"
            type={FormFieldTypes.Password}
            label="Password input"
            name="password-input"
          />
        </div>
        <div className="row">
          <Input
            className="col"
            type={FormFieldTypes.Number}
            label="Number input"
            name="number-input"
          />
        </div>
        <div className="row">
          <Input
            className="col"
            type={FormFieldTypes.Number}
            label="Number input w/ min, max and step"
            name="number-w-min-max"
            min={10}
            max={50}
            step={10}
          />
        </div>
        <div className="row">
          <Input
            className="col"
            type={FormFieldTypes.Email}
            label="Email input"
            name="email-input"
          />
        </div>
        {/* END <Input /> */}

        <hr />

        {/* START <Checkbox /> */}
        <div className="row">
          <Checkbox label="Checkbox input" name="checkbox-input" />
        </div>
        <div className="row">
          <Checkbox
            label="Checkbox input w/ helptext"
            name="checkbox-w-helptext"
          >
            This is helptext as a child component.
            <br />
            <i>It can contain arbitrary html/react components</i>
          </Checkbox>
        </div>
        <div className="row">
          <Checkbox
            label="Checkbox input w/ defaultChecked and required"
            name="checkbox-w-defaultchecked-required"
            defaultChecked
            required
          />
        </div>
        <div className="row">
          <Checkbox
            label="Checkbox w/ a custom value"
            name="checkbox-w-custom-value"
            value="visibility"
          />
        </div>
        {/* END <Checkbox /> */}

        <hr />

        {/* START <Radio /> */}
        <div className="row">
          <Radio
            label="Radio input"
            name="radio-input"
            value="visible-to-all"
          />
        </div>
        <div className="row">
          <Radio
            label="Radio input w/ group"
            name="radio-input-group"
            value="value-1"
          />
          <Radio
            label="Radio input w/ group 2"
            name="radio-input-group"
            value="value-2"
          />
          <Radio
            label="Radio input w/ group 3"
            name="radio-input-group"
            value="value-3"
          />
        </div>
        <div className="row">
          <Radio
            label="Radio input w/ helptext"
            name="radio-w-helptext"
            value="my-value"
          >
            This is helptext as a child component.
            <br />
            <i>It can contain arbitrary html/react components</i>
          </Radio>
        </div>
        <div className="row">
          <Radio
            label="Radio input w/ defaultChecked and required"
            name="radio-w-defaultchecked-req"
            value="my-value"
            defaultChecked
          />
        </div>
        {/* END <Radio /> */}

        <hr />

        {/* START <File /> */}
        <div className="row">
          <File className="col" label="File Input" name="file-input" />
        </div>
        <div className="row">
          <File
            className="col"
            label="File input w/ helptext"
            name="file-input-2"
          >
            This is helptext as a child component.
            <br />
            <i>It can contain arbitrary html/react components</i>
          </File>
        </div>
        {/* END <File /> */}

        <hr />

        {/* START <Range /> */}
        <div className="row">
          <Range className="col" label="Range input" name="range-input" />
          <Range
            className="col"
            label="Range input w/ helptext"
            name="range-input-2"
          >
            This is helptext as a child component.
            <br />
            <i>It can contain arbitrary html/react components</i>
          </Range>
        </div>
        <div className="row">
          <Range
            className="col"
            label="Range input w/ datalist"
            name="range-w-datalist"
            datalist={[
              { value: 0, label: '0%' },
              { value: 25, label: <i>75%</i> },
              { value: 50, label: '50%', pipe: false },
              { value: 75, label: <strong>75%</strong> },
              { value: 85 },
              { value: 90 },
              { value: 100, label: '100%' },
            ]}
          />
        </div>
        <div className="row">
          <Range
            className="col"
            label="Range input w/ default value"
            name="range-w-defaultvalue"
            defaultValue="33"
          />
        </div>
        {/* END <Range /> */}

        <hr />

        {/* START <Textarea /> */}
        <div className="row">
          <Textarea className="col" label="Text area" name="text-area" />
        </div>
        <div className="row">
          <Textarea
            className="col"
            label="Text area w/ helptext"
            name="text-w-helptext"
          >
            This is helptext as a child component.
            <br />
            <i>It can contain arbitrary html/react components</i>
          </Textarea>
        </div>
        <div className="row">
          <Textarea
            className="col"
            label="Text area w/ placeholder"
            name="textarea-w-placeholder"
            placeholder="This is a placeholder..."
          />
        </div>
        <div className="row">
          <Textarea
            className="col"
            label="Text area w/ default value"
            name="textarea-w-defaultvalue"
            defaultValue="This is a **defaultValue**"
          />
        </div>
        {/* END <Textarea /> */}

        <hr />

        {/* START <Select /> */}
        <div className="row">
          <Select
            className="col"
            label="Select input"
            name="select-input"
            options={[
              { value: 'option-1', label: 'Option One' },
              { value: 'option-2', label: 'Option Two' },
            ]}
          />
        </div>
        <div className="row">
          <Select
            className="col"
            label="Select w/ defaultValue"
            name="select-w-defaultValue"
            options={[
              { value: 'option-1', label: 'Option One' },
              { value: 'option-2', label: 'Option Two' },
            ]}
            defaultValue="option-2"
          />
        </div>
        <div className="row">
          <Select
            className="col"
            label="Select w/ helptext"
            name="select-w-helptext"
            options={[
              { value: 'option-1', label: 'Option One' },
              { value: 'option-2', label: 'Option Two' },
            ]}
          >
            This is helptext as a child component.
            <br />
            <i>It can contain arbitrary html/react components</i>
          </Select>
        </div>
        <div className="row">
          <Select
            className="col"
            label="Select w/ multiple"
            name="select-w-multiple"
            options={[
              { value: 'option-1', label: 'Option One' },
              { value: 'option-2', label: 'Option Two' },
              { value: 'option-3', label: 'Option Three' },
              { value: 'option-4', label: 'Option Four' },
            ]}
            multiple
          />
        </div>
        {/* END <Select /> */}
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </Form>
    </div>
  );
};

ReactDOM.render(<Example />, document.getElementById('root'));
