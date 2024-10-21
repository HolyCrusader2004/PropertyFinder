import { useEffect, useRef } from 'react'
import classes from '../pages/PropertyDetails.module.css'
export default function Modal({ children, onClose, isOpen }) {
  const dialog = useRef();

  useEffect(() => {
    if (isOpen) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog className={classes.modal} ref={dialog} onClose={onClose}>
      {children}
    </dialog>
  );
}