import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Results.scss';
import LoadingOverlay from 'react-loading-overlay';
import { Modal, Button } from 'react-bootstrap';

function Results() {
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(false);

  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.post('/api/results', location.state);
        if (data.message) {
          throw new Error(data.message);
        } else {
          setMetrics(data);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [location]);

  const renderDashboardCards = () => {
    const dashboardSections = [
      {
        title: 'Response Rate',
        value: metrics.responseRate,
        isPercentage: true,
        details: {
          good: {
            range: [0.81, 1],
            description:
              'Great work. Continue to respond to inquiries and booking requests as quickly as possible to keep your response rate close to 100%. Airbnb recommends responding within 24 hours to increase response rate and the likelihood of a booking.',
          },
          average: {
            range: [0.41, 0.8],
            description:
              'Make sure you turned on notifications your Airbnb app. Responding to guests within 24 hours will raise your response rate and bookings. You can also improve communication by using the quick replies and scheduled messages features.',
          },
          poor: {
            range: [0, 0.4],
            description:
              "Consider downloading the Airbnb app and responding in 24 hours or less to increase your resonse rate. The app allow users to choose between email, text and/or in-app notification for new messages. Keep in mind that AirBnb uses the percentage of new guest messages you've answered within 24 hours in the past 30 days to calculate your rate",
          },
        },
      },
      {
        title: 'Review Rating',
        value: metrics.reviews.reviewRating,
        isPercentage: false,
        details: {
          good: {
            range: [4.71, 5],
            description:
              "You're on track to be a superhost. Your rating is among the top hostings on airbnb. To get even closer to 5 stars be sure to address past review feedback. That way you can make adjustments to your property or set your guests expectations with descriptions and photos that best represent the listing.",
          },
          average: {
            range: [4, 4.7],
            description:
              "You're on the right track. At this point, you're most likely doing things right but better communication and a personalized experience might bring your ratings closer to 5 stars. Create FAQs and canned responses so you can promptly answer inquiries. Leave a good first impression by welcoming guests with local treats, souvenirs or/and a personalized welcome note.",
          },
          poor: {
            range: [0, 3.99],
            description:
              "Any rating below 4 is considered low by Airbnb's high standards. Focus on the three most important criteria for guests: communication, expectations and unforeseen events. It's recommended to respond to new inquiries within 24 hours but responding in a few hours will help you to get better reviews. Make sure your photos and description represent your property well. Broken expectations are a big reason for low ratings. Lastly, if an incident happens handle them at the earliest while having a cordial and a 'guest is always right' attitude.",
          },
        },
      },
      {
        title: 'Review Number',
        value: metrics.reviews.reviewNumber,
        isPercentage: false,
        details: {
          good: {
            range: [20, 100000],
            description: `${metrics.reviews.reviewNumber} is a great number of reviews. Most top ranking listings have at least 20 reviews. Focus on getting more 5 star reviews so you can compeate with the top performing properties`,
          },
          average: {
            range: [2, 20],
            description:
              "Keep getting more reviews. Properties with at least 20 reviews are more likely to rank high on search results and are more trustworthy for guests. Don't forget to ask your most satisfied guests for reviews. You can also leave them a review",
          },
          poor: {
            range: [0, 2],
            description:
              'You need at least 3 reviews for them to show up on your profile but user can see reviews from other properties you manage. Encourage your guests to leave reviews by sending them a follow-up messages and reviewing your guests.',
          },
        },
      },
      {
        title: 'Cleanliness Review',
        value: metrics.reviews.cleanliness,
        isPercentage: false,
        details: {
          good: {
            range: [4.75, 5],
            description:
              "You're on track to be a superhost. Your rating is among the top hostings on airbnb. To get even closer to 5 stars be sure to address past review feedback. That way you can make adjustments to your property or set your guests expectations with descriptions and photos that best represent the listing.",
          },
          average: {
            range: [4, 4.74],
            description:
              "You're on the right track. At this point, you're most likely doing things right but better communication and a personalized experience might bring your ratings closer to 5 stars. Create FAQs and canned responses so you can promptly answer inquiries. Leave a good first impression by welcoming guests with local treats, souvenirs or/and a personalized welcome note.",
          },
          poor: {
            range: [0, 3.99],
            description:
              "Any rating below 4 is considered low by Airbnb's high standards. Focus on the three most important criteria for guests: communication, expectations and unforeseen events. It's recommended to respond to new inquiries within 24 hours but responding in a few hours will help you to get better reviews. Make sure your photos and description represent your property well. Broken expectations are a big reason for low ratings. Lastly, if an incident happens handle them at the earliest while having a cordial and a 'guest is always right' attitude.",
          },
        },
      },
      // {
      //   title: 'Accuracy Reviw',
      //   value: metrics.reviews.accuracy,
      //   isPercentage: false,
      // },
      // {
      //   title: 'Communication Review',
      //   value: metrics.reviews.communication,
      //   isPercentage: false,
      // },
      // {
      //   title: 'Location Review',
      //   value: metrics.reviews.location,
      //   isPercentage: false,
      // },
      // {
      //   title: 'Check-in Review',
      //   value: metrics.reviews['check-in'],
      //   isPercentage: false,
      // },
      // {
      //   title: 'Value Review',
      //   value: metrics.reviews.value,
      //   isPercentage: false,
      // },
    ];

    return dashboardSections.map(
      ({ title, value, isPercentage, details }, i) => {
        if (typeof value != 'undefined') {
          const finalValue = isPercentage
            ? `${Math.round(value * 100)}%`
            : value;

          let desc;
          let cat;
          Object.keys(details).forEach((category) => {
            const { range, description } = details[category];
            if (range[0] <= value && value <= range[1]) {
              desc = description;
              cat = category;
            }
          });

          return (
            <div key={i} className='col col-12 col-lg-12'>
              <div className='results__dashboard-card my-2 p-3'>
                <div className='results__details-container'>
                  <div>
                    <h2>{title}</h2>
                    <p>{desc}</p>
                  </div>
                  <div className={`results__value__${cat}`}>
                    <p className='text-center text-capitalize font-weight-bold'>
                      {cat}
                    </p>
                    <p className='results__percentage mx-5'>{finalValue}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }
    );
  };

  const handleClose = () => {
    setError(false);
  };

  return (
    <>
      <LoadingOverlay
        className='results__loading-overlay'
        active={isLoading}
        spinner
        text='Loading... It might take a few seconds.'>
        {metrics ? (
          <>
            <div className='results__container container'>
              {/* body */}
              <h1>{metrics.title}</h1>
              <div className='row'>{renderDashboardCards()}</div>
            </div>
          </>
        ) : (
          <div className='results__container container' />
        )}
        <>
          <Modal centered show={error} onHide={handleClose}>
            <Modal.Body bsPrefix='modal-body text-center'>
              Oops.. Something went wrong. Please try again.
            </Modal.Body>
            <Modal.Footer bsPrefix='modal-footer text-center d-flex justify-content-center'>
              <Link to='/'>
                <Button variant='primary' onClick={handleClose}>
                  Go to Homepage
                </Button>
              </Link>
            </Modal.Footer>
          </Modal>
        </>
      </LoadingOverlay>
    </>
  );
}

export default Results;

// TODO: add how to improve rankings section
