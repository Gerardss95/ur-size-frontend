import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Error extends Component {
  render() {
    const { error } = this.props;
    return <div>{error}</div>;
  }
}

Error.propTypes = {
  error: PropTypes.string,
};

export default Error;