import React from 'react';
import css from './Gallery.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

class Gallery extends React.Component {
  state = {
    search: '',
    page: 1,
  };

  onSubmit = search => {
    this.setState({ search, page: 1 });
    // if (this.state.page === 1) {
    //   window.scrollTo({
    //     top: 0,
    //     behavior: 'smooth',
    //   });
    // }
  };

  largeImageId = imageLargeId => {
    this.setState({ imageLargeId });
  };

  loadMore = () => {
    const { page } = this.state;
    const newPage = page + 1;

    this.setState({ page: newPage });
    console.log('123');
  };

  render() {
    return (
      <div className={css.Gallery}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          search={this.state.search}
          loadMore={this.loadMore}
          page={this.state.page}
        />
      </div>
    );
  }
}

export default Gallery;
