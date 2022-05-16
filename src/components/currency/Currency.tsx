import React, { ComponentType, PureComponent } from 'react';

import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';

import { GetCurrenciesQuery } from '../../generated/graphql';
import { withQuery, WithQueryProps } from '../../services/useQueryHoc';
import { setCurrency } from '../../store/actionCreators';
import { RootStateType } from '../../store/rootStore';

import s from './Currency.module.css';

type MapStateToProps = {
  currency: string;
};
type MapDispatchToProps = {
  changeCurrencies: (currency: string) => void;
};
type OwnPropsType = {
  data: GetCurrenciesQuery;
};
type CurrencyType = {
  data: GetCurrenciesQuery;
};

type CurrencyTypes = MapStateToProps &
  MapDispatchToProps &
  CurrencyType &
  OwnPropsType &
  WithQueryProps;
class Currency extends PureComponent<CurrencyTypes, { showCurrencies: boolean }> {
  constructor(props: any) {
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
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const { showCurrencies } = this.state;
    const { currency } = this.props;

    return (
      <div className={s.currency}>
        <div className={s.currencyButton} onClick={this.onBtnClick} aria-hidden>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          {currency}

          <div className={showCurrencies ? s.up : s.down} />
        </div>
        {data && showCurrencies && (
          <div className={s.currencyOptions}>
            {data.currencies?.map(c => (
              // eslint-disable-next-line react/button-has-type
              <button
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
        {/* </div> */}
      </div>
    );
  }
}
const mapStateToProps = (state: RootStateType): MapStateToProps => ({
  currency: state.main.currency,
});
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  changeCurrencies: (currency: string) => dispatch(setCurrency(currency)),
});
export default compose<ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withQuery,
)(Currency);
