import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import formConnect, {
  Checkbox,
  Radio,
  Select,
  Text,
  Textarea,
  Message,
} from '../src';
import './BasicForm.scss';
import ChildForm from './ChildForm';

// Rules and messages
const schemas = {
  email: {
    rules: 'required | isEmail | maxLength(32) | remoteRule',
    messages: 'Can not be empty! | Please enter a valid email address. | Can not exceed {{param}} characters. | The email already exists',
  },
  phone: {
    rules: 'isPhone',
    messages: 'Mobile: {{value}} is not valid.',
  },
  birthday: {
    rules: 'requiredField(phone) | isDate',
    messages: 'Phone and birthday at least one entry! | Please enter a valid date.',
  },
  sex: {
    rules: 'required',
    messages: 'Can not be empty!',
  },
  city: {
    rules: 'required',
    messages: 'Can not be empty!',
  },
  hobby: {
    rules: 'required | selectLimit(3)',
    messages: 'Can not be empty! | Select at least {{param}}.',
  },
  remarks: {
    rules: 'minLength(10) | maxLength(60)',
    messages: 'Can not be less than {{param}} characters. | Can not exceed {{param}} characters.',
  },
  money: {
    rules: 'required | isNumeric | maxLength(5)',
    messages: 'Can not be empty! | Please enter an integer amount. | Can not exceed {{param}} characters.',
  },
  url: {
    rules: 'isUrl',
    messages: 'Please enter the link address.',
  },
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Custom methods
const methods = {
  // Rely on other fields
  requiredField(field, param) {
    const otherField = this.fields[param];
    return this.required(field) || (otherField.result && this.required(otherField));
  },
  async remoteRule(field) {
    await sleep(1000);
    if (field.value) {
      return field.value !== 'example@example.com';
    }
    return false;
  },
  selectLimit(field, param) {
    if (Array.isArray(field.value)) {
      return field.value.length >= param;
    }
    return false;
  },
};

class BasicForm extends Component {

  state = {
    formValues: {
      sex: '1', // default
    },
    isAllValid: undefined,
  };

  // Validate the BasicForm
  handleValidateBasicForm = async () => {
    const isAllValid = await this.basicForm.validate();
    this.setState({
      isAllValid,
    });
  };

  // Change the form value
  handleChangeBasicForm = () => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        email: 'example@example.com',
        phone: '133333333333',
        hobby: ['1', '2'],
      },
    });
  };

  render() {
    return (
      <div className="app">
        <div className="jumbotron">
          <div className="container">
            <h1 className="title">react-validate-framework</h1>
            <h2 className="title">A lightweight and extensible React validation component</h2>
            <h3>
              <iframe
                src="https://ghbtns.com/github-btn.html?user=MinJieLiu&repo=react-validate-framework&type=star&count=true&size=large"
                frameBorder="0"
                scrolling="0"
                width="160px"
                height="30px"
              />
            </h3>
            <a href="https://github.com/MinJieLiu/react-validate-framework">
              <img
                className="fork-me"
                src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67"
                alt="Fork me on GitHub"
                data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"
              />
            </a>
          </div>
        </div>
        <div className="container">
          <h2>App component</h2>
          <button
            className="btn btn-info"
            onClick={this.handleValidateBasicForm}
          >
            Validate BasicForm
          </button>
          <button
            className="btn btn-default"
            onClick={this.handleChangeBasicForm}
          >
            Change the sub component form value
          </button>
          <div className="well-sm">
            <p>StatusďĽš{String(this.state.isAllValid)} ďĽundefined | true | falseďĽ‰</p>
            <p>Basic Form valuesďĽš{JSON.stringify(this.state.formValues)}</p>
          </div>
        </div>
        <BasicForm
          ref={(ref) => {
            this.basicForm = ref;
          }}
          classNames={{
            static: 'form-control',
            success: 'valid-success',
            error: 'valid-error',
          }}
          values={this.state.formValues}
        />
      </div>
    );
  } 
}

export default formConnect(schemas, methods)(BasicForm);
