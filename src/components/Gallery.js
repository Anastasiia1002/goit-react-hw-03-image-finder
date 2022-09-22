import React from 'react';
import css from './Gallery.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

class Gallery extends React.Component {
  state = {
    search: '',
  };

  onSubmit = search => {
    this.setState({ search, page: 1 });
  };

  largeImageId = imageLargeId => {
    this.setState({ imageLargeId });
  };

  render() {
    return (
      <div className={css.Gallery}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery search={this.state.search} />
      </div>
    );
  }
}

export default Gallery;
