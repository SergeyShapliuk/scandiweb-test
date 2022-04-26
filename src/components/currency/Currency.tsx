import React, { PureComponent } from 'react';

import arrowIcon from '../../assets/image/arrow.svg';
import { withQuery } from '../../services/useQueryHoc';

import s from './Currency.module.css';

class Currency extends PureComponent<any> {
  private currencyWrapperRef: any = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      showCurrencies: false,
    };
  }

  // onBtnClick = () => {
  //   this.setState(prev => ({ showCurrencies: !prev.showCurrencies }));
  // };
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
    const { currencies } = data;
    // const { isOpenCurrencies } = this.props;
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
        <div ref={this.currencyWrapperRef}>
          <div className={s.currencyButton} onClick={() => {}} aria-hidden>
            {/* {currencies.id} */}
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img className={s.down} src={arrowIcon} alt="" />
            <span className={s.currencyArrow} />
          </div>
          {showCurrencies && (
            <div className={s.currencyOptions}>
              {currencies.map((currency: any, index: any) => (
                // eslint-disable-next-line react/button-has-type
                <button
                  className={s.optionsButton}
                  key={index.id}
                  id={currency.symbol}
                  // onClick={this.changeCurrency}
                >
                  {currency.symbol}
                  &#160;
                  {currency.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withQuery(Currency);
