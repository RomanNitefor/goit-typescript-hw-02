import Modal from "react-modal";
import css from "./ImageModal.module.css";

interface ImageModalProps {
  isOpen: boolean;
  closeModal: () => void;
  imageUrl: string;
  altDescription: string;
}

export default function ImageModal({
  isOpen,
  closeModal,
  imageUrl,
  altDescription,
}: ImageModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={css.content}
      overlayClassName={css.overlay}
      contentLabel="Image Modal"
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <img src={imageUrl} alt={altDescription} className={css.image} />
    </Modal>
  );
}
