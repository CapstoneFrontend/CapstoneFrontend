import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import ItemStyles from './itemStyles';
import './styles/infoPanel.scss';
import StarRating from './starRating';
import SizeSelector from './sizeSelector';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemStock: '',
      quantityToPurchase: 0,
      itemSku: 0,
    };
  }

  handleChangeSize = (e) => {
    const sku = $(`option[value="${e.target.value}"]`).attr('sku');
    this.setState(
      { itemStock: Number(e.target.value), itemSku: sku },
      () => console.log(this.state.itemStock),
    );
  };

  handleChangeQuantity = (e) => {
    this.setState(
      { quantityToPurchase: e.target.value },
      () => console.log(this.state.quantityToPurchase),
    );
  };

  handleCart = (e) => {
    e.preventDefault();
    const promises = [];
    const { quantityToPurchase, itemSku } = this.state;

    function addCart(item) {
      return fetch('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/cart', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sku_id: item }),
      });
    }

    for (let i = 0; i < quantityToPurchase; i += 1) {
      promises.push(addCart(itemSku));
    }

    Promise.all(promises)
      .then(() => {

      })
      .catch(() => {

      });
  };

  render() {
    const {
      product, handleClick, currentStyle, reviewsStarAverage,
      productStyles,
    } = this.props;
    const { itemStock, quantityToPurchase } = this.state;
    if ($.isEmptyObject(product)) {
      return 'No Item to display';
    }
    const {
      category, name, slogan, description,
    } = product;
    if (!description
    || description === '') {
      return (
        <div>
          <div className="category-title">{category}</div>
          <div className="name-title">{name}</div>
          <ItemStyles
            handleClick={handleClick}
            currentSelectedStyle={currentStyle}
            productStyles={productStyles}
          />
          {/* <SizeSelector /> */}
        </div>
      );
    }
    return (
      <div>
        <div>
          {reviewsStarAverage ? <StarRating reviewsStarAverage={reviewsStarAverage} /> : ''}
          {reviewsStarAverage ? <a className="read-reviews">Read all reviews</a> : ''}
        </div>
        <div className="category-title">{category}</div>
        <div className="name-title">{name}</div>
        <div className="sale-price">
          <div className="dollar">$</div>
          {currentStyle.sale_price ? currentStyle.sale_price : ''}
          {currentStyle.sale_price ? <div className="original-price-strike">{currentStyle.original_price}</div> : <div className="original-price">{currentStyle.original_price}</div>}
        </div>
        <ItemStyles
          handleClick={handleClick}
          currentSelectedStyle={currentStyle}
          productStyles={productStyles}
        />
        <SizeSelector
          currentSelectedStyle={currentStyle}
          itemStock={itemStock}
          quantityToPurchase={quantityToPurchase}
          handleChangeSize={this.handleChangeSize}
          handleChangeQuantity={this.handleChangeQuantity}
        />
        <button type="submit" onClick={this.handleCart}>
          Add To Cart
        </button>
        <div className="item-description-container">
          <div className="product-slogan">{slogan || ''}</div>
          <div className="product-description">{description || ''}</div>
        </div>

      </div>
    );
  }
}

Overview.defaultProps = {
  product: {},
  reviewsStarAverage: null,
};

Overview.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    campus: PropTypes.string,
    name: PropTypes.string,
    slogan: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    default_price: PropTypes.string,
  }),
  handleClick: PropTypes.func.isRequired,
  currentStyle: PropTypes.shape({
    style_id: PropTypes.number,
    name: PropTypes.string,
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
    'default?': PropTypes.bool,
    photos: PropTypes.arrayOf(PropTypes.shape({ thumbnail_url: PropTypes.string })),
    skus: PropTypes.objectOf(
      PropTypes.shape({
        quantity: PropTypes.number.isRequired,
        size: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  productStyles: PropTypes.arrayOf(PropTypes.shape({
    style_id: PropTypes.number,
    name: PropTypes.string,
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
    'default?': PropTypes.bool,
    photos: PropTypes.arrayOf(PropTypes.shape({
      thumbnail_url: PropTypes.string,
      url: PropTypes.string,
    })),
    skus: PropTypes.objectOf(
      PropTypes.shape({
        quantity: PropTypes.number,
        size: PropTypes.string,
      }),
    ),

  })).isRequired,
  reviewsStarAverage: PropTypes.number,
};

export default Overview;
