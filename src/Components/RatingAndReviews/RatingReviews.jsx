import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RatingReviewsList from './RatingReviewsList';
import ReviewButtons from './ReviewButtons';
import reviewPropTypes from './reviewPropTypes';
import SortOptions from './SortOptions';
import RatingBreakdown from './RatingBreakdown';
import ProductBreakdown from './ProductBreakdown';

export default function RatingReviews({
  data, helpOnClick,
  onSortChange, characteristics, ratings, recommended,
  onFieldChange, reviewsAverageRating, reviewsNew, reviewsTotal,
}) {
  const pageSize = 2;
  const [displayCount, setDisplayCount] = useState(pageSize);
  const [rating, setRating] = useState([]);

  const newData = rating.length === 0
    ? data.slice()
    : data.slice().filter((x) => rating.includes(x.rating));
  const displayReviews = newData.slice(0, displayCount);
  const btnVisible = newData.length > displayCount;

  const moreReviewsOnClick = () => {
    setDisplayCount(displayCount + pageSize);
  };

  const ratingBarOnClick = (range) => {
    if (rating.length === 0) {
      setRating([range]);
    } else {
      const rr = rating.slice();
      const ind = rating.indexOf(range);
      if (ind === -1) {
        rr.push(range);
      } else {
        rr.splice(ind, 1);
      }
      setRating(rr);
    }
  };

  return (
    <div style={{
      marginTop: '50px', display: 'flex', width: '80%', marginLeft: '10%',
    }}
    >
      <div style={{ width: '40%' }}>
        <RatingBreakdown
          ratings={ratings}
          recommended={recommended}
          reviewsAverageRating={reviewsAverageRating}
          ratingBarOnClick={ratingBarOnClick}
        />
        <ProductBreakdown characteristics={characteristics} />
      </div>
      <div style={{ width: '60%' }}>
        <div className="sortOption">
          <SortOptions
            onSortChange={onSortChange}
            reviewsTotal={reviewsTotal}
            data={data}
          />
        </div>
        <div className="reviewList">
          {
            displayReviews.map((review) => (
              <RatingReviewsList
                helpOnClick={helpOnClick}
                key={review.review_id}
                review={review}
              />
            ))
          }
        </div>
        <ReviewButtons
          moreReviewsOnClick={moreReviewsOnClick}
          btnVisible={btnVisible}
          onFieldChange={onFieldChange}
          reviewsNew={reviewsNew}
        />
      </div>
    </div>

  );
}

RatingReviews.propTypes = {
  data: PropTypes.arrayOf(reviewPropTypes),
  helpOnClick: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  ratings: PropTypes.shape({
    2: PropTypes.string,
    3: PropTypes.string,
    4: PropTypes.string,
    5: PropTypes.string,
    1: PropTypes.string,
  }),
  recommended: PropTypes.shape({
    false: PropTypes.string,
    true: PropTypes.string,
  }),
  characteristics: PropTypes.shape({
    Size: PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
    }),
    Width: PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
    }),
    Quality: PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
    }),
    Length: PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
    }),
    Fit: PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
    }),
  }),
  onFieldChange: PropTypes.func.isRequired,
  reviewsAverageRating: PropTypes.number.isRequired,
  reviewsNew: PropTypes.shape({
    summary: PropTypes.string,
    body: PropTypes.string,
  }),
  reviewsTotal: PropTypes.number.isRequired,
};
RatingReviews.defaultProps = {
  ratings: {
    1: '0', 2: '0', 3: '0', 4: '0', 5: '0',
  },
  recommended: {},
  characteristics: {},
  reviewsNew: {},
  data: [],
};
