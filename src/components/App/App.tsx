import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import { fetchImages } from "../articles-api";
import css from "./App.module.css";
import toast, { Toaster } from "react-hot-toast";

interface Image {
  id: string;
  url: string;
  alt_description?: string;
}

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [topic, setTopic] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImageUrl, setModalImageUrl] = useState<string>("");
  const [modalAltDescription, setModalAltDescription] = useState<string>("");

  // Функція для обробки пошуку
  const handleSearch = async (newTopic: string) => {
    setImages([]);
    setPage(1);
    setTopic(newTopic);
    setError("");
  };

  // Функція для завантаження більше зображень
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Відкриття модального вікна
  const openModal = (imageUrl: string, altDescription: string) => {
    setModalImageUrl(imageUrl);
    setModalAltDescription(altDescription);
    setModalIsOpen(true);
  };

  // Закриття модального вікна
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Виконуємо запит лише при зміні теми або сторінки
  useEffect(() => {
    if (topic === "") {
      return;
    }

    async function getImages() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchImages(topic, page);
        setImages((prevImages) => {
          return [...prevImages, ...data];
        });
      } catch (error) {
        toast.error(
          "Something seems to have happened, please reload this page!",
          { position: "top-left" }
        );
        setError("Error loading images");
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [page, topic]);

  return (
    <div className={css.app}>
      <SearchBar onSearch={handleSearch} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery items={images} onImageClick={openModal} />
          {images.length > 0 && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
        </>
      )}
      <Loader loading={loading} />
      <Toaster />
      <ImageModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        imageUrl={modalImageUrl}
        altDescription={modalAltDescription}
      />
    </div>
  );
}
