import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { searchImages } from '../../utils/searchImages';

class ImageGallery extends React.Component {
  state = {
    images: [],
    loading: false,
    error: '',
    page: 1, // 7 -> 1
    search: '',
    // isModalOpen: false,
    // modalData: null,
  };

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.search !== state.search) {
      return { search: nextProps.search, page: 1 };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.search !== this.state.search
    ) {
      this.setImages();
    }
    // if (prevState.images !== this.state.images && this.state.page !== 1) {
    //   window.scrollBy({
    //     top: window.innerHeight - 100,
    //     behavior: 'smooth',
    //   });
    console.log(this.state.images);
    //}
  }
  setImages = () => {
    const { search, page } = this.state;
    this.setState({ loading: true });
    searchImages({ search, page })
      .then(images =>
        this.setState(prev => ({ images: [...prev.images, images] }))
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  //   changePage = () => {
  //     this.setState(prev => ({ page: prev.page + 1 }));
  //   };

  //   componentDidUpdate(prevProps, prevState) {
  //     const prevSearch = prevProps.search;
  //     const nextSearch = this.props.search;

  //     if (prevSearch !== nextSearch) {
  //       console.log('zminy u poshuku');
  //     }
  //     this.setState({ loading: true });
  // fetch(
  //   `https://pixabay.com/api/?q=${nextSearch}&page=${page}&key=29461295-5611ba5917eca01d45986ceff&image_type=photo&orientation=horizontal&per_page=12`
  // )
  //   .then(res => res.json())
  //   .then(searchResults => this.setState({ searchResults }))
  //   .finally(() => this.setState({ loading: false }));
  //   }

  render() {
    const { images, loading } = this.state;
    return (
      <ul className="gallery">
        {loading && <div> Loading ...</div>}
        {images.length > 0 &&
          images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
      </ul>
    );
  }
}

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
