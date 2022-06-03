/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import AddTagPage from './addTagPage';

function AddTagContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  return <AddTagPage {...props} />;
}

// DashboardContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };

export default AddTagContainer;
