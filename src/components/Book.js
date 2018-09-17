import React, { PureComponent } from 'react'

export default class Book extends PureComponent {
    state = {
        reviewHidden: true
    }

    toggleReviewVisibility = () => {
        this.state.reviewHidden ? this.setState({reviewHidden: false}) : this.setState({reviewHidden: true})
    }

    render () {
        console.log(this.props);
        const {bookData, cover} = this.props
        const reviewHidden = this.state.reviewHidden
        const {title, publisher, bookLink, bookIntroduction, primaryReview, otherReviews} = bookData
        const buttonText = reviewHidden? 'More Reviews' : 'Fewer Review'

        const moreReviews = reviewHidden? '' :
                    otherReviews && 
                    (<ul className='more-book-review'>
                        {otherReviews.map(review => 
                            <li key={review.reviewer}>
                                <p className='book-text'>
                                    {review.review}
                                </p>
                                <p className={review.magazine? 'commentor magazine' : 'commentor'}>
                                    {'– ' + review.reviewer}
                                </p>
                            </li>
                        )}
                    </ul>)

        return (
            <main className='book'>
                <h2 className='main-title'>
                    {title}
                </h2>
                <div className='grid'>
                    <div className='book-pic-container'>
                        <div className='gap'>
                            <img className='book-img' 
                                src={cover} 
                                alt={`The cover of '${title}'`}
                            />
                            <p className='publisher'>{publisher}</p>
                            <a className='book-link' target="_blank" href={bookLink} rel="noopener noreferrer">
                                Available on Amazon
                            </a>
                        </div>
                    </div>

                    <div className='book-introduction'>
                        {bookIntroduction && bookIntroduction.map((text, idx) =>
                            <p className='book-text' key={`${title} intriduction ${idx}`}>
                                {text}
                            </p>
                        )}
                    </div>

                    {primaryReview && 
                        <div className='book-review'>
                            <h2 className='main-title'>Reviews</h2>
                                <p className='book-text'>
                                    {primaryReview.review}
                                </p>
                                <p className='commentor magazine'>
                                    {'– ' + primaryReview.reviewer}
                                </p>
                            {moreReviews}
                        </div>
                    }

                </div>
                {
                    primaryReview && otherReviews &&
                    <div className='review-button-container'>
                        <button className='review-button'
                            onClick={this.toggleReviewVisibility}
                        >
                            {buttonText}
                        </button>
                    </div>
                }
            </main>
        )
    }
}