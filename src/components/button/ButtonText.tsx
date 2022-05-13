import React, { PureComponent } from 'react';

import s from './ButtonText.module.scss';

type ButtonTextType = {
  id: any;
  value: any;
  onClick: (id: any) => void;
  selected: any;
};
class ButtonText extends PureComponent<ButtonTextType> {
  render() {
    const { id, value, onClick, selected } = this.props;
    return (
      <button
        type="button"
        onClick={() => onClick(id)}
        className={`${s.attributeItem} ${selected ? s.active : ''}`}
      >
        {value}
      </button>
    );
  }
}
export default ButtonText;
