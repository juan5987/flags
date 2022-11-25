import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div>
      <h2>Page non trouvée</h2>
      <Link to='/'>Menu principal</Link>
    </div>
  );
};

export default PageNotFound;
