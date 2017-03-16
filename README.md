# react-validate-framework

A lightweight and extensible React validation component

[![npm](https://img.shields.io/npm/v/react-validate-framework.svg?style=flat-square)](https://www.npmjs.com/package/react-validate-framework)
[![travis-ci](https://travis-ci.org/MinJieLiu/react-validate-framework.svg?branch=master)](https://travis-ci.org/MinJieLiu/react-validate-framework)
[![npm](https://img.shields.io/npm/dt/react-validate-framework.svg?style=flat-square)](https://github.com/MinJieLiu/react-validate-framework)

[中文 README](README-zh_CN.md)

Demo: [https://minjieliu.github.io/react-validate-framework](https://minjieliu.github.io/react-validate-framework)

You can check out the code to see examples.

## How to use?

    npm i react-validate-framework --save

Import:

```js
import formConnect, {
  Checkbox,
  Radio,
  Select,
  Text,
  Textarea,
  Message,
} from 'react-validate-framework';
```

Rules and messages like this:

```js
const schemas = {
  email: {
    rules: 'required | isEmail | maxLength(32)',
    messages: 'Can not be empty! | Please enter a valid email address. | Can not exceed {{param}} characters.',
  },
  hobby: {
    rules: 'required | selectLimit(2)',
    messages: 'Can not be empty! | Select at least {{param}}.',
  },
};

const methods = {
  selectLimit(field, param) {
    if (Array.isArray(field.value)) {
      return field.value.length >= param;
    }
    return false;
  },
};
```

The BasicForm like this:

```js
const BasicForm = () => (
  <div className="form-group">
    <Text
      name="email"
      placeholder="Please input your email"
    />
    <Message className="valid-error-message" name="email" />
  </div>
);
```

Export the module:

```js
export default formConnect(schemas, methods)(BasicForm);
```

Finally, sets the initialized value:

```js
<BasicForm
  classNames={{
    static: 'form-control',
    success: 'valid-success',
    error: 'valid-error',
  }}
  values={this.state.formValues}
/>

// The values like this { email: '', hobby: ['2'] }
// These props can be initialized in `BasicForm` use `init`
```

Validate methods can refer to [validate-framework-utils](https://github.com/MinJieLiu/validate-framework-utils)

### Form components

 * `Checkbox`
 * `Radio`
 * `Select`
 * `Text`
 * `Textarea`
 * `Message`

The `name` attribute is required in form components, Other parameters can be overridden.

Of course, you can also use unencapsulated form components, just specify `value` and` onChange` on the line:

```js
const {
  formControl: {
    fields,
    onFormChange,
  },
} = this.props;

return (
  <input
    className={fields.email.className}
    name="email"
    type="text"
    onChange={onFormChange}
    value={fields.email.value}
    placeholder="Please input your email"
  />
);
```

### API

#### FormControl params

| name | type | required | default | description |
| :--- | :--- | :--- | :--- | :--- |
| values | Object | false | | Key-value pairs for `name` and` value` |
| classNames | Object | false | {} | Its `key` value contains` static`, `success`,` error` |

#### Form params

| name | type | default | setState | description |
| :--- | :--- | :--- | :--- | :--- |
| fields | Object | | | The collection of fields |
| isAllValid | Boolean | | | Gets the global validation status |
| formValues | Object | | | Gets a list of form values |
| init | function | | false | Initializes the form value and classes |
| onFormChange | function | | true | Form change event listener |
| changeValues | function | | true | Customize to change the values |
| validate | function | | true | Validate all fields |
| validateByNames | function | | true | Validate the component through names |
| addValues | function | | true | Add one or more value |
| removeValues | function | | true | Remove one or more value |
| addSchemas | function | | false | Add one or more validation rules |
| removeSchemas | function | | true | Remove one or more validation rules |

You can either pass in `values` as an argument, or call the `init` method when the form is initialized.

You can invoke the `changeValues` method to simulate a form change event.
