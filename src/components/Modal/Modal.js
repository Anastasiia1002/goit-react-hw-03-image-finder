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
    if (e.code === 'Escape') {
      console.log(this.props.toggleModal);
      this.props.toggleModal();
    }
  };

  render() {
    return (
      <div className={css.overlay}>
        <div className={css.modal}>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}
