import React from 'react';
import '../../relateOutfitLists.scss';
import GetStars from './getStars';

export default function relatedCardReview({ relatedProductRatingInfo }) {
  if (relatedProductRatingInfo !== undefined) {
    if (relatedProductRatingInfo.numReviews !== undefined) {
      return (
        <div id="productStarRating">
          <GetStars
            ratingValue={relatedProductRatingInfo.rating}
            numRatings={relatedProductRatingInfo.numReviews}
          />
        </div>
      );
    }
  }
  return (
    <div id="productStarRating">
      <GetStars
        ratingValue={0}
        numRatings={0}
      />
    </div>
  );
}
