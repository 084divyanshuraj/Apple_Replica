import { useState, useEffect } from 'react';
import { getProducts, getProductReviews, createReview } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Star, MessageCircle, User } from 'lucide-react';
import './ReviewsPage.css';

export default function ReviewsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [reviews, setReviews] = useState([]);
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load products on mount
  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      if (data.length > 0) {
        setSelectedProductId(data[0].product_id);
      }
    }).catch(err => console.error("Could not load products", err));
  }, []);

  // Load reviews when selected product changes
  useEffect(() => {
    if (selectedProductId) {
      fetchReviews(selectedProductId);
    }
  }, [selectedProductId]);

  const fetchReviews = async (id) => {
    try {
      const data = await getProductReviews(id);
      setReviews(data);
    } catch (err) {
      console.error("Could not fetch reviews", err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to leave a review.");
    if (!comment.trim()) return alert("Please enter a comment.");

    setIsSubmitting(true);
    try {
      await createReview({
        user_id: user.user_id,
        product_id: parseInt(selectedProductId),
        rating,
        comment
      });
      // Clear form & refresh
      setComment('');
      setRating(5);
      fetchReviews(selectedProductId);
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedProduct = products.find(p => p.product_id === parseInt(selectedProductId));

  return (
    <div className="reviews-page animate-fade-in">
      <div className="reviews-header">
        <h1>Customer Reviews</h1>
        <p>See what others are saying, or share your own thoughts.</p>
      </div>

      <div className="reviews-content-wrapper">
        <div className="reviews-selector-card">
          <label htmlFor="product-select">Select a product to view reviews</label>
          <div className="select-wrapper">
            <select 
              id="product-select" 
              value={selectedProductId} 
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              {products.map(p => (
                <option key={p.product_id} value={p.product_id}>
                  {p.product_name}
                </option>
              ))}
            </select>
          </div>
          {selectedProduct && (
            <div className="selected-product-info animate-fade-in">
              <h2 className="product-name">{selectedProduct.product_name}</h2>
              <p className="product-desc">{selectedProduct.description}</p>
              <div className="product-price">${selectedProduct.price}</div>
            </div>
          )}
        </div>

        <div className="reviews-feed">
          <div className="reviews-feed-header">
            <h3>Reviews & Ratings ({reviews.length})</h3>
          </div>

          <div className="review-cards">
            {reviews.length === 0 ? (
              <div className="no-reviews-empty-state">
                <MessageCircle size={40} className="empty-icon" />
                <p>No reviews yet for this product.</p>
                <span>Be the first to share your thoughts!</span>
              </div>
            ) : (
              reviews.map(review => (
                <div key={review.review_id} className="review-card animate-fade-in">
                  <div className="review-card-header">
                    <div className="review-user-info">
                      <div className="user-avatar">
                        <User size={16} />
                      </div>
                      <span className="user-name">{review.full_name || 'Anonymous User'}</span>
                    </div>
                    <span className="review-date">
                      {new Date(review.review_date).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}
                    </span>
                  </div>
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < review.rating ? '#f5c518' : 'none'} 
                        color={i < review.rating ? '#f5c518' : '#e0e0e0'} 
                      />
                    ))}
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))
            )}
          </div>
          
          <div className="review-composer">
            <h3>Write a Review</h3>
            {user ? (
              <form className="review-form" onSubmit={handleReviewSubmit}>
                <div className="form-group rating-group">
                  <label>Your Rating</label>
                  <div className="rating-selector">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Star 
                        key={num} 
                        size={24} 
                        onClick={() => setRating(num)}
                        fill={num <= rating ? '#f5c518' : 'none'}
                        color={num <= rating ? '#f5c518' : '#d2d2d7'}
                        className="star-btn"
                      />
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="comment">Your Comment</label>
                  <textarea 
                    id="comment" 
                    rows="4" 
                    placeholder="What did you like or dislike? What is this product best for?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Posting...' : 'Post Review'}
                </button>
              </form>
            ) : (
              <div className="login-prompt-box">
                <p>You need to be signed in to join the conversation.</p>
                <button className="btn-secondary" onClick={() => window.location.href = '/login?redirect=/reviews'}>
                  Sign in to Review
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
