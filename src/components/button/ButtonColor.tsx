import React, { PureComponent } from 'react';

import s from './ButtonColor.module.scss';

export type ButtonColorType = {
  id: any;
  name: string;
  value: any;
  onClick: (name: string, id: string) => void;
  disabled: boolean;
  selected: any;
};
class ButtonColor extends PureComponent<ButtonColorType> {
  render() {
    const { id, name, value, onClick, disabled, selected } = this.props;
    return (
      <button
        aria-hidden
        type="button"
        onClick={() => onClick(name, id)}
        disabled={disabled}
        className={`${s.attributeItemSwatch} ${selected ? s.activeSwatch : ''}`}
        style={{ backgroundColor: value }}
      />
    );
  }
}
export default ButtonColor;
