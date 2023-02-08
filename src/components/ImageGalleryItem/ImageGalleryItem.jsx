import PropTypes from 'prop-types';

const ImageGalleryItem = ({id, webformatURL, largeImageURL, imgClick }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={id}
        onClick={() => imgClick(largeImageURL, id)}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
}