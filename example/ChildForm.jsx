/**
 * Created by MingYi on 2016/12/23.
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import FormControl from '../src';
import './ChildForm.scss';

const schemas = {
  money: {
    rules: 'required | isNumeric | maxLength(5)',
    messages: '不能为空 | 请输入整数金额 | 不能超过 {{param}} 个字符',
  },
  url: {
    rules: 'isUrl',
    messages: '请输入链接地址',
  },
};

class ChildForm extends Component {

  static propTypes = {
    fields: PropTypes.object,
    isAllValid: PropTypes.bool,
    onChange: PropTypes.func,
    validate: PropTypes.func,
    addFields: PropTypes.func,
    removeFields: PropTypes.func,
    addSchemas: PropTypes.func,
    removeSchemas: PropTypes.func,
  };

  handleSubmitClick = () => {
    const { validate } = this.props;
    validate();
  };

  // 添加域
  handleAddFriends = () => {
    const { addFields, addSchemas } = this.props;
    // value 为初始值
    addFields({
      friend: {
        value: '',
      },
    });
    // 添加验证规则
    addSchemas({
      friend: {
        rules: 'required',
        messages: '不能为空',
      },
    });
  };

  // 删除域
  handleDeleteFriend = () => {
    const { removeFields, removeSchemas } = this.props;
    removeFields(['friend']);
    removeSchemas(['friend']);
  };

  render() {
    const {
      fields,
      onChange,
      isAllValid,
    } = this.props;

    return (
      <div className="child-form">
        <h3>子组件</h3>
        <div className="form-group">
          <label htmlFor="money">金额：</label>
          <input
            className={fields.money.className}
            id="money"
            name="money"
            type="text"
            onChange={onChange}
            value={fields.money.value}
            placeholder="请输入金额"
          />
          <em className="valid-error-message">{fields.money.message}</em>
        </div>
        <div className="form-group">
          <button
            className="btn btn-default"
            onClick={fields.friend ? this.handleDeleteFriend : this.handleAddFriends}
          >
            {fields.friend ? '删除朋友' : '添加朋友'}
          </button>
        </div>
        {
          fields.friend
            ? (
              <div className="form-group">
                <label htmlFor="friend">名字：</label>
                <input
                  className={fields.friend.className}
                  id="friend"
                  name="friend"
                  type="text"
                  onChange={onChange}
                  value={fields.friend.value}
                  placeholder="请输入名字"
                />
                <em className="valid-error-message">{fields.friend.message}</em>
              </div>
            ) : null
        }
        <div className="form-group">
          <label htmlFor="url">网址：</label>
          <input
            className={fields.url.className}
            id="url"
            name="url"
            type="text"
            onChange={onChange}
            value={fields.url.value}
            placeholder="请输入网址"
          />
          <em className="valid-error-message">{fields.url.message}</em>
        </div>
        <input
          className={classNames('btn', {
            'btn-info': !isAllValid,
            'btn-success': isAllValid,
          })}
          id="submit"
          type="button"
          onClick={this.handleSubmitClick}
          value={isAllValid ? '验证通过' : '验证组件'}
        />
      </div>
    );
  }
}

export default FormControl(schemas)(ChildForm);
