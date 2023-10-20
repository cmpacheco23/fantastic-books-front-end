import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import * as profileService from "../../services/profileService";
import catOnShelfImage from "/assets/blackcat.png";
import styles from "./ProfileInfo.module.css";
import "flickity/css/flickity.css";
import uglyCat from "/assets/uglycat.png";
import greyCat from "/assets/greycat.png";

const ProfileInfo = () => {
  const [profile, setProfile] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [modalData, setModalData] = useState({
    isOpen: false,
    name: "",
    isEditing: false,
    id: null,
  });
  const inputRef = useRef(null);
  const scrollIntervalRefs = useRef({});
  const flickityRef = useRef(null);
  const bookContainerRefs = useRef({});
  const { profileId } = useParams();
  const [currentBooks, setCurrentBooks] = useState({});
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getOneProfile(profileId);
        setProfile(data);
        setShowButton(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, [profileId]);

  useEffect(() => {
    if (modalData.isOpen && inputRef.current) inputRef.current.focus();
  }, [modalData.isOpen]);

  useEffect(() => {
    if (profile && profile.shelves) {
      const initialBooks = {};
      profile.shelves.forEach((shelf) => {
        initialBooks[shelf._id] = shelf.books;
      });
      setCurrentBooks(initialBooks);
    }
  }, [profile]);

  useEffect(() => {
    return () => {
      if (flickityRef.current) {
        flickityRef.current.destroy();
      }
    };
  }, []);

  const handleShelf = async (action, shelfId) => {
    try {
      const result = await profileService[action](
        { name: modalData.name },
        profileId,
        shelfId
      );
      if (result) {
        setProfile((prev) => {
          const updatedShelves =
            action === "createShelf"
              ? [...prev.shelves, result]
              : prev.shelves.map((s) => (s._id === shelfId ? result : s));
          return { ...prev, shelves: updatedShelves };
        });
      }
      setModalData({ isOpen: false, name: "", isEditing: false, id: null });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteShelf = async (shelfId) => {
    try {
      await profileService.deleteShelf(profileId, shelfId);
      setProfile((prev) => {
        const updatedShelves = prev.shelves.filter(
          (shelf) => shelf._id !== shelfId
        );
        return { ...prev, shelves: updatedShelves };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleScroll = (shelfId, direction) => {
    const container = bookContainerRefs.current[shelfId];
    if (container) {
      container.scrollLeft += direction * 200;
    }
  };

  const handleScrollOnHover = (shelfId, direction) => {
    const container = bookContainerRefs.current[shelfId];
    if (container) {
      scrollIntervalRefs.current[shelfId] = setInterval(() => {
        container.scrollLeft += direction * 20; // Adjust scroll amount as needed
      }, 200); // 200ms for smooth scrolling effect
    }
  };

  const stopScrollOnHover = (shelfId) => {
    clearInterval(scrollIntervalRefs.current[shelfId]);
  };

  const handleDarkModeChange = (event) => {
    setDarkMode(event.target.checked);
  };

  return (
    <main>
    {profile ? (
      <div>
        <div className={styles.spacer} />
        <img
          className={styles.photo}
          src={profile.photo}
          alt="profile photo"
        />
        <h1 className={styles.name}>{profile.name}</h1>
        <div className="toggle-container">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            checked={darkMode}
            onChange={handleDarkModeChange}
          />
          <label htmlFor="checkbox" className="checkbox-label">
            <i className="fas fa-moon"></i>
            <i className="fas fa-sun"></i>
            <span className="ball"></span>
          </label>
        </div>
        {showButton && (
          <button
            className={styles.b68}
            onClick={() =>
              setModalData({
                isOpen: true,
                isEditing: false,
                name: "",
                id: null,
                placeholder: "Shelf Name",
              })
            }
          >
            New Shelf
          </button>
        )}
        {profile.shelves.map((shelf) => (
          <div className={styles.shelf} key={shelf._id}>
            <div className={styles.shelfNavigation}>
              <button
                className={styles.arrowButton}
                onMouseEnter={() =>
                  setTimeout(() => handleScrollOnHover(shelf._id, -1), 150)
                }
                onMouseLeave={() => stopScrollOnHover(shelf._id)}
                onClick={() => scrollBookContainer(shelf._id, -1)}
              >
                ⬅️
              </button>
              <div className={styles.shelfContent}>
                <span className={styles.shelfName}>
                  <span
                    className={styles.tooltip}
                    data-title={shelf.name}
                    tooltip={shelf.name}
          <h1 className={styles.name}>{profile.name}</h1>
          <div className={styles.container}>
          <div className={styles.toggleContainer}>
            <input
              type="checkbox"
              className={styles.funCheckbox}
              id="funCheckbox"
              checked={darkMode}
              onChange={handleDarkModeChange}
            />
            <label htmlFor="funCheckbox" className={styles.funCheckboxLabel}>
              <i className="fas fa-moon"></i>
              <i className="fas fa-sun"></i>
              <span className={styles.funCheckboxThumb}></span>
            </label>
          </div>
          </div>
          {showButton && (
            <button
              className={styles.b68}
              onClick={() =>
                setModalData({
                  isOpen: true,
                  isEditing: false,
                  name: "",
                  id: null,
                  placeholder: "Shelf Name",
                })
              }
            >
              New Shelf
            </button>
          )}
          {profile.shelves.map((shelf) => (
            <div className={styles.shelf} key={shelf._id}>
              <div className={styles.shelfNavigation}>
                <button
                  className={styles.arrowButton}
                  onMouseEnter={() =>
                    setTimeout(() => handleScrollOnHover(shelf._id, -1), 150)
                  }
                  onMouseLeave={() => stopScrollOnHover(shelf._id)}
                  onClick={() => scrollBookContainer(shelf._id, -1)}
                >
                  ⬅️
                </button>
                <div className={styles.shelfContent}>
                  <span className={styles.shelfName}>
                    <span
                      className={styles.tooltip}
                      data-title={shelf.name}
                      tooltip={shelf.name}
                    >
                      Name:{" "}
                      {shelf.name.length > 20
                        ? `${shelf.name.substring(0, 28)}...`
                        : shelf.name}
                    </span>
                  </span>
                  <div
                    className={styles.bookContainer}
                    ref={(ref) => (bookContainerRefs.current[shelf._id] = ref)}
                  >
                    Name:{" "}
                    {shelf.name.length > 20
                      ? `${shelf.name.substring(0, 28)}...`
                      : shelf.name}
                  </span>
                </span>
                <div
                  className={styles.bookContainer}
                  ref={(ref) => (bookContainerRefs.current[shelf._id] = ref)}
                >
                  {currentBooks[shelf._id]?.map((book) => (
                    <img
                      key={book._id}
                      src={book.cover}
                      alt={book.title}
                      className={styles.bookCover}
                    />
                  ))}
                  {shelf.books?.length === 0 && (
                    <img
                      src={darkMode ? catOnShelfImage : greyCat}
                      alt="Cat on Shelf"
                      className={styles.catImage}
                    />
                  )}
                </div>
              </div>
              <button
                className={styles.arrowButton}
                onMouseEnter={() =>
                  setTimeout(() => handleScrollOnHover(shelf._id, 1), 200)
                }
                onMouseLeave={() => stopScrollOnHover(shelf._id)}
                onClick={() => scrollBookContainer(shelf._id, 1)}
              >
                ➡️
              </button>
            </div>
            <div className={styles.shelfActions}>
              <button
                className={styles.edit}
                onClick={() =>
                  setModalData({
                    isOpen: true,
                    isEditing: true,
                    name: shelf.name,
                    id: shelf._id,
                  })
                }
              >
                ✏️
              </button>
              <button
                className={styles.delete}
                onClick={() => handleDeleteShelf(shelf._id)}
              >
                🗑️
              </button>
            </div>
            {modalData.isEditing && modalData.id === shelf._id && (
              <div className={styles.modalOpen}>
                <label className={styles.input}>
                  Edit Shelf Name:
                  <input
                    className={styles.input}
                    ref={inputRef}
                    type="text"
                    value={modalData.name}
                    onChange={(e) =>
                      setModalData({ ...modalData, name: e.target.value })
                    }
                  />
                </label>
                <button
                  className={styles.b68}
                  onClick={() => handleShelf("editShelf", shelf._id)}
                >
                  Save
                </button>
                <button
                  className={styles.b68}
                  onClick={() =>
                    setModalData({
                      isOpen: false,
                      name: "",
                      isEditing: false,
                      id: null,
                    })
                  }
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
        {modalData.isOpen && !modalData.isEditing && (
          <div className={styles.modalOpen}>
            <label>
              Shelf Name:
              <input
                className={styles.newShelf}
                ref={inputRef}
                type="text"
                value={modalData.name}
                onChange={(e) =>
                  setModalData({ ...modalData, name: e.target.value })
                }
              />
            </label>
            <button
              className={styles.b68}
              onClick={() => handleShelf("createShelf")}
            >
            Create
            </button>
            <button
              className={styles.b68}
              onClick={() =>
                setModalData({
                  isOpen: false,
                  name: "",
                  isEditing: false,
                  id: null,
                })
              }
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    ) : (
      <p>
        Loading...
        <img src={uglyCat} />
      </p>
    )}
    </main>
  );
};

export default ProfileInfo;
