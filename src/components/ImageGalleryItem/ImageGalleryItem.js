import React from 'react';

const ImageGalleryItem = ({ image }) => {
  console.log(image.id);
  return (
    <li className="gallery-item">
      <img src={image.webformatURL} alt={image.tags} />
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
