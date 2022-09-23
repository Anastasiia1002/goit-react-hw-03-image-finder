import React from 'react';
import css from './Modal.module.css';

export default class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.escapeFun);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.escapeFun);
  }

  escapeFun = e => {
    if (e.key === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleBackdrope = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };

  render() {
    const { src, alt } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleBackdrope}>
        <div className={css.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}
