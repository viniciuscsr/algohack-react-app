import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePosts } from '../../custom-hooks/';
import './Blog.scss';

const BlogPost = () => {
  const [blogPosts, isLoading] = usePosts();

  return (
    <Col className='posts__container'>
      {blogPosts ? (
        blogPosts.map((post) => {
          return (
            <Row className='my-3'>
              <Link className='posts__post' key={post.slug} to={post.slug}>
                <div className='posts__post__img__container'>
                  <img
                    className='posts__post__img__container__img'
                    src={post.featuredImage.url}
                    alt={post.title}
                  />
                </div>
                <small>{new Date(post.publishedDate).toDateString()}</small>
                <h3>{post.title}</h3>
                <p>{`${post.description.substring(0, 175)}...`}</p>
              </Link>
            </Row>
          );
        })
      ) : (
        <div>Loading</div>
      )}
    </Col>
  );
};

export default BlogPost;
