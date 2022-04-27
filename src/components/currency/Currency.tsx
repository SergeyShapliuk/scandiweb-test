import React, { ComponentType, PureComponent } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { GetCurrenciesQuery } from '../../generated/graphql';
import { withQuery, WithQueryProps } from '../../services/useQueryHoc';
import { changeCurrencies } from '../../store/mainReducer/mainReducer';
import { RootStateType } from '../../store/rootStore/rootReducer';

import s from './Currency.module.css';

type MapStateToProps = {
  currency: string;
};
type OwnPropsType = {
  data: GetCurrenciesQuery;
};
type CurrencyType = {
  data: GetCurrenciesQuery;
  changeCurrencies: (currency: string) => void;
};

type CurrencyTypes = MapStateToProps & CurrencyType & OwnPropsType & WithQueryProps;
class Currency extends PureComponent<CurrencyTypes> {
  constructor(props: any) {
    super(props);
    this.state = {
      showCurrencies: false,
    };
  }

  onBtnClick = () => {
    // @ts-ignore
    this.setState(prevState => ({ showCurrencies: !prevState.showCurrencies }));
  };

  changeCurrency = (e: any) => {
    this.props.changeCurrencies(e.currentTarget.value);
    this.setState({ showCurrencies: false });
  };
  // openCurrencies = () => {
  //   this.props.setIsOpenCurrencies(!this.props.isOpenCurrencies);
  // };
  //
  // // pickCurrency = (price: string) => {
  //   this.props.setCurrentPrice(price);
  // };

  render() {
    const { loading, error, data } = this.props.getCurrencies;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log('currince', data);
    // @ts-ignore
    const { showCurrencies } = this.state;
    const { currency } = this.props;
    console.log('currency', currency);
    return (
      // <div className={s.currency}>
      //   <div className={s.actionsContainer}>
      //     <div className={s.currencySwitcher} onClick={this.openCurrencies} aria-hidden>
      //       <span className={s.currencySwitcherValue} />
      //       <span className={s.currencyArrow} />
      //       <img src={downIcon} alt="icon" />
      //       <div className={`${s.currenciesList} ${isOpenCurrencies ? s.open : null}`}>
      //         {/* {Object.entries(currencyMarks).map((v: string[]) => ( */}
      //         {/*  <div className={s.currencyValue} onClick={() => this.pickCurrency(v[0])}> */}
      //         {/*    {`${v[1]} ${v[0]}`} */}
      //         {/*  </div> */}
      //         {/* ))} */}
      //       </div>
      //     </div>
      //   </div>
      //   {/* <span>$</span> */}
      // </div>
      <div className={s.currency}>
        {/* <div ref={this.currencyWrapperRef}> */}

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
                // value={currency?.symbol}
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
export default compose<ComponentType>(
  connect(mapStateToProps, { changeCurrencies }),
  withQuery,
)(Currency);
