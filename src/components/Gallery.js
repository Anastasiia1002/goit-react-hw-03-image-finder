import React from 'react';

import ImageGallery from './ImageGallery/ImageGallery';
// import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';

class Gallery extends React.Component {
  state = {
    search: '',
  };
  onSubmit = search => {
    this.setState({ search });
  };
  // componentDidMount() {
  //   this.setState({ loading: true });
  // }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery search={this.state.search} />
        {/* <Loader /> */}
      </div>
    );
  }
}

export default Gallery;
