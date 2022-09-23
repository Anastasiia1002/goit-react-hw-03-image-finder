import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import apiImages from '../../utils/searchImages';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends React.Component {
  state = {
    images: [],
    error: null,
    search: '',
    status: Status.IDLE,
    showModal: false,
    largeImageId: '',
    largeImageIdUser: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.search;
    const nextSearch = this.props.search;

    if (prevSearch !== nextSearch) {
      this.setState({ status: Status.PENDING });

      apiImages
        .searchImages(nextSearch, this.props.page)
        .then(images =>
          this.setState(prev => ({
            images: [...images],
            status: Status.RESOLVED,
          }))
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
    if (prevProps.page !== this.props.page && this.props.page !== 1) {
      apiImages
        .searchImages(nextSearch, this.props.page)
        .then(images =>
          this.setState(prev => ({
            images: [...prev.images, ...images],
            status: Status.RESOLVED,
          }))
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  toggleModal = (largeImage, user) => {
    this.setState(prev => ({
      showModal: !prev.showModal,
      largeImageId: largeImage,
      largeImageIdUser: user,
    }));
  };
  // loadMore = () => {
  //   const { page } = this.state;
  //   const newPage = page + 1;

  //   this.setState({ page: newPage });
  //   console.log('123');
  // };

  render() {
    const { images, status, showModal, largeImageId, largeImageIdUser } =
      this.state;
    const { search } = this.props;

    if (status === 'idle') {
      return <div className={css.att}>Введіть дані для пошуку!</div>;
    }
    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected' || images < 1) {
      return (
        <div className={css.att}>Відсутнє зображення з назвою {search} ='(</div>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          {showModal && (
            <Modal
              toggleModal={this.toggleModal}
              src={largeImageId}
              alt={largeImageIdUser}
            />
          )}
          <ul className={css.ImageGallery}>
            {images.map(image => (
              <ImageGalleryItem
                toggleModal={this.toggleModal}
                largeImageId={largeImageId}
                key={image.id}
                image={image}
              />
            ))}
          </ul>
          {images.length > 0 && <Button loadMore={this.props.loadMore} />}
        </>
      );
    }
  }
}

export default ImageGallery;
ImageGallery.propTypes = {
  search: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};
