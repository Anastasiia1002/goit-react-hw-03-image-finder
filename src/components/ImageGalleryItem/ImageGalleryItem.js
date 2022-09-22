import React from 'react';
import css from './ImageGalleryItems.module.css';

const ImageGalleryItem = ({ image, toggleModal }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={toggleModal}
        id={image.id}
        src={image.webformatURL}
        alt={image.tags}
        className={css.image}
      />
    </li>
  );
};
// class ImageGalleryItem extends React.Component {
//   state = {
//     loading: true
//   }

//   render() {
//     return (
//       {this.props.images.map((image) => (
//         <li className="gallery-item">
//     // <img src={image.webformatURL} alt="" />
//     //   </li>
//       ))}
//     )

//     // this.props.searchResults.map(({id, webformatURL,largeImageURL}) => {
//     //   <li className="gallery-item">
//     // <img src="" alt="" />
//     //   </li>
//     // })
//   }
// }

export default ImageGalleryItem;