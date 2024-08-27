import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getCourseReviews, editCourseReview, addCourseReview } from '../../api/reviewApi';
import { IReview } from '../../types/CourseTypes';
import { useParams } from 'react-router-dom';

const MySwal = withReactContent(Swal);

interface RatingAndReviewProps {
    isPurchased: boolean; // Add this prop to determine if the user purchased the course
}

const RatingAndReview: React.FC<RatingAndReviewProps> = ({ isPurchased }) => {
    const [reviews, setReviews] = useState<IReview[]>([]);
    const { courseId } = useParams<{ courseId: string }>();

    useEffect(() => {
        fetchReviews();
    }, [courseId]);

    const fetchReviews = async () => {
        try {
            const response = await getCourseReviews(courseId ?? '');
            console.log(`Reviews fetched:`, response);
            setReviews(response);
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
            // MySwal.fire('Error', 'Failed to load reviews. Please try again.', 'error');
        }
    };

    const handleRating = async () => {
        if (!isPurchased) {
            MySwal.fire('Error', 'You need to purchase the course to leave a rating.', 'error');
            return;
        }

        let selectedRating = 0;

        const { value: formValues } = await MySwal.fire({
            title: 'Rate and Review the Course',
            html: `
        <div class="mb-4">
          <label for="rating" class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div class="flex items-center justify-center mb-4" id="rating-container">
            ${[1, 2, 3, 4, 5].map(
                (star) => `
                <button
                  type="button"
                  class="text-2xl focus:outline-none text-gray-300"
                  id="star-${star}"
                  data-value="${star}"
                >
                  ★
                </button>`
            ).join('')}
          </div>
          <textarea id="review" class="swal2-textarea" placeholder="Write your review here..."></textarea>
        </div>
      `,
            focusConfirm: false,
            didOpen: () => {
                const ratingContainer = document.getElementById('rating-container');
                const stars = ratingContainer?.querySelectorAll('button');

                stars?.forEach((star) => {
                    star.addEventListener('click', () => {
                        selectedRating = parseInt(star.getAttribute('data-value') || '0');
                        stars.forEach((s, index) => {
                            s.classList.toggle('text-yellow-400', index < selectedRating);
                            s.classList.toggle('text-gray-300', index >= selectedRating);
                        });
                    });
                });
            },
            preConfirm: () => {
                const review = (document.getElementById('review') as HTMLTextAreaElement)?.value;

                if (!selectedRating) {
                    MySwal.showValidationMessage('Please select a rating');
                } else if (!review) {
                    MySwal.showValidationMessage('Please enter a review');
                }

                return { rating: selectedRating, review };
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
        });

        if (formValues) {
            const { rating, review } = formValues;

            try {
                await addCourseReview((courseId ?? ''), { rating, comment: review });
                await fetchReviews();
                MySwal.fire('Success', 'Your review has been submitted!', 'success');
            } catch (error) {
                MySwal.fire('Error', 'Failed to submit your review. Please try again.', 'error');
            }
        }
    };

    async (review: IReview) => {
        if (!isPurchased) {
            MySwal.fire('Error', 'You need to purchase the course to edit a review.', 'error');
            return;
        }

        let selectedRating = review.rating;

        const { value: formValues } = await MySwal.fire({
            title: 'Edit Your Review',
            html: `
        <div class="mb-4">
          <label for="rating" class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div class="flex items-center justify-center mb-4" id="rating-container">
            ${[1, 2, 3, 4, 5].map(
                (star) => `
                <button
                  type="button"
                  class="text-2xl focus:outline-none ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}"
                  id="star-${star}"
                  data-value="${star}"
                >
                  ★
                </button>`
            ).join('')}
          </div>
          <textarea id="review" class="swal2-textarea">${review.comment}</textarea>
        </div>
      `,
            focusConfirm: false,
            didOpen: () => {
                const ratingContainer = document.getElementById('rating-container');
                const stars = ratingContainer?.querySelectorAll('button');

                stars?.forEach((star) => {
                    star.addEventListener('click', () => {
                        selectedRating = parseInt(star.getAttribute('data-value') || '0');
                        stars.forEach((s, index) => {
                            s.classList.toggle('text-yellow-400', index < selectedRating);
                            s.classList.toggle('text-gray-300', index >= selectedRating);
                        });
                    });
                });
            },
            preConfirm: () => {
                const updatedReview = (document.getElementById('review') as HTMLTextAreaElement)?.value;

                if (!selectedRating) {
                    MySwal.showValidationMessage('Please select a rating');
                } else if (!updatedReview) {
                    MySwal.showValidationMessage('Please enter a review');
                }

                return { rating: selectedRating, review: updatedReview };
            },
            showCancelButton: true,
            confirmButtonText: 'Update',
        });

        if (formValues) {
            const { rating, review: updatedReview } = formValues;

            try {
                await editCourseReview((courseId ?? ''), review._id, { rating, comment: updatedReview });
                await fetchReviews();
                MySwal.fire('Success', 'Your review has been updated!', 'success');
            } catch (error) {
                MySwal.fire('Error', 'Failed to update your review. Please try again.', 'error');
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mt-8 relative">
            <div className="absolute top-6 right-6">
                {isPurchased ? (
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={handleRating}
                    >
                        Rate the Course
                    </button>
                ) : (
                    <button
                        className="bg-gray-300 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed"
                        onClick={handleRating}
                    >
                        Rate the Course
                    </button>
                )}
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reviews and Ratings</h2>
            <div className="space-y-6">
                {reviews.length > 0 ? (
                    reviews.reverse().map((review) => (
                        <div key={review._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold text-lg text-gray-800">{review.userName}</span>
                                    <span className="text-gray-500">·</span>
                                    <span className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`text-xl ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No reviews yet. Be the first to rate this course!</p>
                )}
            </div>
        </div>
    );
};

export default RatingAndReview;
