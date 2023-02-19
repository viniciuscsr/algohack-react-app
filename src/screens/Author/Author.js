import { useEffect, useState } from 'react';
import { useAuthor } from '../../custom-hooks/';
import { useLocation } from 'react-router-dom';
import './Author.scss';
import { Col, Container, Row } from 'react-bootstrap';

const Author = () => {
  const [author, isLoading] = useAuthor();
  const [authorToUse, setAuthorToUse] = useState(null);

  const { pathname } = useLocation();
  const routeSlug = pathname.split('/').slice(-1)[0];

  useEffect(() => {
    if (author) {
      setAuthorToUse(
        author.filter((writer) => {
          return writer.name.toLowerCase() === routeSlug.replace(/-/g, ' ');
        })[0]
      );
    }
  }, [author]);

  return (
    <Container>
      {authorToUse && (
        <Row className='author'>
          <Col md={3}>
            <img
              className='author__headshot'
              src={authorToUse.headshot.url}
              alt='author headshot'
            />
          </Col>
          <Col md={9}>
            <div className='author__description'>
              <h1>{authorToUse.name}</h1>
              <p>{authorToUse.bio}</p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Author;
