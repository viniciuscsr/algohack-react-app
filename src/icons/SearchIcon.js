import React from 'react';

const Search = ({ fill = '#757575', width = '20', height = '20' }) => {
  return (
    <svg
      enable-background='new 0 0 1000 1000'
      version='1.1'
      viewBox='0 0 1e3 1e3'
      xmlSpace='preserve'
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}>
      <path
        fill={fill}
        d='m932.8 850-201-201c56.4-67.6 90.3-154.5 90.3-249.5 0.1-215.3-174.2-389.5-389.4-389.5-215.3 0-389.5 174.2-389.5 389.5 0 215.2 174.2 389.5 389.5 389.5 61.1 0 119-14.1 170.5-39.1 3 4.7 6.6 9.1 10.7 13.2l203 203c32 32 84 32 116 0 31.9-32.1 31.9-84.1-0.1-116.1zm-807.6-450.5c0-169.8 137.7-307.5 307.5-307.5s307.5 137.7 307.5 307.5-137.8 307.5-307.5 307.5c-169.8 0-307.5-137.7-307.5-307.5z'
      />
    </svg>
  );
};

export default Search;
