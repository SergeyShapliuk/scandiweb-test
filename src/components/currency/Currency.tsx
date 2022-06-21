import React, { ComponentType, PureComponent } from 'react';

import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';

import { withQuery, WithQueryProps } from '../../services/useQueryHoc';
import { setCurrency } from '../../store/actionCreators';
import { RootStateType } from '../../store/rootStore';
import { getCurrency } from '../../utils/selectors';

import s from './Currency.module.scss';

type MapStateToProps = {
  currency: string;
};
type MapDispatchToProps = {
  changeCurrencies: (currency: string) => void;
};
type CurrencyTypes = MapStateToProps &
  MapDispatchToProps &
  WithQueryProps & { showModal?: boolean };

class Currency extends PureComponent<CurrencyTypes, { showCurrencies: boolean }> {
  constructor(props: CurrencyTypes) {
    super(props);
    this.state = {
      showCurrencies: false,
    };
  }

  onBtnClick = () => {
    this.setState(prevState => ({ showCurrencies: !prevState.showCurrencies }));
  };

  changeCurrency = (e: any) => {
    this.props.changeCurrencies(e.currentTarget.value);
    this.setState({ showCurrencies: false });
  };

  render() {
    const { loading, error, data } = this.props.getCurrencies;
    if (loading) return <p>Wait for the download...</p>;
    if (error) return <p>Error :(</p>;
    const { showCurrencies } = this.state;
    const { currency, showModal } = this.props;

    return (
      <div className={s.currency}>
        <div className={s.currencyButton} onClick={this.onBtnClick} aria-hidden>
          {currency}

          <div className={!showModal && showCurrencies ? s.up : s.down} />
        </div>
        {!showModal && showCurrencies && (
          <div className={s.currencyOptions}>
            {data?.currencies?.map(c => (
              <button
                type="button"
                key={c?.symbol}
                className={s.optionsButton}
                id={c?.symbol}
                value={c?.symbol}
                onClick={this.changeCurrency}
              >
                {c?.symbol} {c?.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  currency: getCurrency(state),
});
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  changeCurrencies: (currency: string) => dispatch(setCurrency(currency)),
});
export default compose<ComponentType<{ showModal?: boolean }>>(
  connect(mapStateToProps, mapDispatchToProps),
  withQuery,
)(Currency);
