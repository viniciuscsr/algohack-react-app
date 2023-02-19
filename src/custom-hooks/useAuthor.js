import { useEffect, useState } from 'react';

export default function usePosts() {
  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const query = `
  {
  authorCollection{
    items{
      name
      bio
      headshot{
        url
      }
    }
  }
}
  `;

  useEffect(() => {
    setIsLoading(true);
    window
      .fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authenticate the request
            Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_TOKEN}`,
          },
          // send the GraphQL query
          body: JSON.stringify({ query }),
        }
      )
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        // rerender the entire component with new data
        setAuthor(data.authorCollection.items);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return [author, isLoading];
}
