import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import apiImages from '../../utils/searchImages';
import Modal from '../Modal/Modal';

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
    page: 1,
    search: '',
    status: Status.IDLE,
    showModal: false,
    largeImageId: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.search;
    const nextSearch = this.props.search;

    if (prevSearch !== nextSearch) {
      this.setState({ status: Status.PENDING });

      apiImages
        .searchImages(nextSearch, this.state.page)
        .then(images =>
          this.setState(prev => ({
            images: [...prev.images, ...images],
            status: Status.RESOLVED,
            page: prev.page + 1,
          }))
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }
  toggleModal = e => {
    console.log(e.currentTarget.id);
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageId: e.currentTarget.id,
    }));
    console.log(this.state.largeImageId);
  };
  findImageId = () => {
    const imgId = this.state.images.find(image => {
      return image.id === this.state.largeImageId;
    });
    return imgId;
  };

  render() {
    const { images, status, showModal, largeImageId } = this.state;
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
              // src={this.findImageId().largeImageURL}
              // alt={this.findImageId().tags}
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
        </>
      );
    }
  }
}
// static getDerivedStateFromProps(nextProps, state) {
//   if (nextProps.search !== state.search) {
//     return { search: nextProps.search, page: 1 };
//   }
//   return null;
// }

// componentDidUpdate(prevProps, prevState) {
//   if (
//     prevState.page !== this.state.page ||
//     prevState.search !== this.state.search
//   ) {
//     this.setImages();
//   }
//   // if (prevState.images !== this.state.images && this.state.page !== 1) {
//   //   window.scrollBy({
//   //     top: window.innerHeight - 100,
//   //     behavior: 'smooth',
//   //   });
//   console.log(this.state.images);
//   //}
// }
// setImages = () => {
//   const { search, page } = this.state;
//   this.setState({ loading: true });
//   apiImages({ search, page })
//     .then(images =>
//       this.setState(prev => ({ images: [...prev.images, images] }))
//     )
//     .catch(error => this.setState({ error }))
//     .finally(() => this.setState({ loading: false }));
// };

//   //   changePage = () => {
//   //     this.setState(prev => ({ page: prev.page + 1 }));
//   //   };

//   //

//   render() {
//     const { images, loading } = this.state;
//     return (
//       <ul className="gallery">
//         {loading && <div> Loading ...</div>}
//         {images.length > 0 &&
//           images.map(image => (
//             <ImageGalleryItem key={image.id} image={image} />
//           ))}
//       </ul>
//     );
//   }

export default ImageGallery;

// const ImageGallery = ({ images }) => {
//   return (
//     <ul className={null}>
//       {images.map(image => (
//         <ImageGalleryItem key={image.id} image={image} />
//       ))}
//     </ul>
//   );
// };

// export default ImageGallery;
