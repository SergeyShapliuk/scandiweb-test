import React, { PureComponent } from 'react';

import s from './ButtonSwatch.module.scss';

export type ButtonSwatchType = {
  id: any;
  value: any;
  onClick: (id: string) => void;
  selected: any;
};
class ButtonSwatch extends PureComponent<ButtonSwatchType> {
  render() {
    const { id, value, onClick, selected } = this.props;
    return (
      <button
        aria-hidden
        type="button"
        onClick={() => onClick(id)}
        className={`${s.attributeItemSwatch} ${selected ? s.activeSwatch : ''}`}
        style={{ backgroundColor: value }}
      />
    );
  }
}
export default ButtonSwatch;
