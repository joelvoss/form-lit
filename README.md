# form-lit

Lit form library written in React

## Install

```text
npm install form-lit  OR  yarn add form-lit
```

## Example

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input } from 'form-lit';

const App = () => {
  const handleSubmit = form => {
    console.log(form);
    // -> { my-input: "dynamic value" }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type={'text'} label="Default Input" name="my-input" />

      <button type="submit">Submit</button>
    </Form>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

Have a look inside the `example/` directory to see the development kitchensink
application using a multitude of available form fields.

## Local development

1. Clone this repository and install it's dependencies

   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install
   ```

2. Validate project setup

   ```bash
   # Using npm
   npm run validate

   # Using yarn
   yarn validate
   ```

3. Navigate into the `example/` folder to start your local development
   environment.

   ```bash
   cd ./example

   # Using npm
   npm install && npm start

   # Using yarn
   yarn install && yarn start
   ```

   This will start a simple React application powered by Parcel on `http://localhost:1234`.

---

This project was bootstrapped with [jvdx](https://github.com/joelvoss/jvdx).
