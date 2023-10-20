# [Fantastic Books](https://fantastic-books.netlify.app/)
<p>And where to find them.</p>

### [Check it out here!](https://fantastic-books.netlify.app/)



<img src="public/assets/fantastic-books-logo.png">

##### Table of Contents
<details>
<summary> Click to Expand</summary>

- [Screen Shots](#screen-shots)
- [What is this?](#what-is-this)
- [Getting Started](#getting-started)
- [The Devs](#the-devs)
- [Highlights](#highlights)
- [Attributions](#attributions)
- [Technologies Used](#technologies-used)
- [Next Steps](#next-steps)

</details>
<br>

## Screen Shots

###### The Book Search:
<img src="public/assets/book-search.png">

###### Shelves in the Profile:
<img src="public/assets/shelfShot.png">

## What is this?

Fantastic Books is a MERN stack CRUD app that makes it convenient to keep track of your all the books you will need for all you bibliophilic delights! Dive 20,000 leagues into a personalized reading journey, where you can create custom shelves to curate your tales of wonder and mystery. Whether you're charting the realms of books you've journeyed through, setting sail to the titles on your next adventure list, or unearthing niche categories from the forgotten corners of literature, our platform is your one stop shop for all you will need on you adventure!

## Getting Started
[Fantastic books: The App](https://fantastic-books.netlify.app/)
<br />
[Check out our Trello board here!](https://trello.com/b/AJpyaYO6/fantastic-books-and-where-to-find-them)
<br />
If you are curious about what our back end looks like - [Fantastic Books: The Back End](https://github.com/nonchalamment/magnolia-back-end/)

## The Devs

#### Scrum Manager and Styler:  
## Carla Pacheco  
#### [Github](https://github.com/andrewmorrisondev) [Linked In](https://www.linkedin.com/in/thecarlapacheco/)
<br />

#### Api Manager and Git Comander
## Enes Velovic  
#### [Github](https://github.com/nonchalamment) [Linked In](https://www.linkedin.com/in/enesvelovic/)
<br />

#### Database Manager and Documentor
## Steve Morrison  
#### [Github](https://github.com/trentonwahr) [Linked In](https://www.linkedin.com/in/steven-ansman-morrison/)

## Highlights

<details>
<summary> Click to Expand</summary>

###### Carla: 
```dotnetcli
await Profile.populate(newComment, { path: 'commenter' })
    const existingBook = await Book.findOne({ googleId: bookDetails.googleId })
    // const profile = await Profile.findById(req.user.profile)
    if (existingBook) {
      existingBook.comments.push(newComment);
      await existingBook.save();
    } else {
      const newBook = new Book({
        title: bookDetails.title ? bookDetails.title : '',
        subtitle: bookDetails.subtitle ? bookDetails.subtitle : '',
        authors : bookDetails.authors ? bookDetails.authors : [],
        cover: bookDetails.cover ? bookDetails.cover : '',
        published: bookDetails.published ? bookDetails.published : '',
        description: bookDetails.description ? bookDetails.description : '',
        pages: bookDetails.pages ? bookDetails.pages : 0,
        categories: bookDetails.categories ? bookDetails.categories : [],
        url: bookDetails.url ? bookDetails.url : '',
        googleId: bookDetails.googleId,
        comments: [newComment]
      })

      newBook.comments.push(newComment)
      await newBook.save();
    }
    ('BOOKDETAILS:',bookDetails)
    ('waffle', newComment)
    ('SHOWS NEWCOMMENT COMMENTER', newComment.commenter)
    // newComment.commenter = profile
    res.status(201).json(newComment);
  } catch (err) {
    (err);
    res.status(500).json(err);
  }
```

###### Enes:

```
return (
    <main>
      {profile ? (
        <div>
          <div className={styles.spacer}/>
          <img
            className={styles.photo}
            src={profile.photo}
            alt="profile photo"
          />
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
                  } // 0.2s delay
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
          Loading...<img src={uglyCat} />
        </p>
      )}
    </main>
  );
};
```

###### Steve: Landing.module.css
```
.landingTitle {
  background-color: #242424; 
  border-radius: 10px;
  width: 80%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fade 2s ease-in;
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.landingSubTitle {
  background: #c90205;
  font-family:'Times New Roman', Times, serif;
  font-size: 32px;
  margin-bottom: 200px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: slowFade 4s ease-in;
}

@keyframes slowFade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```
</details>
<br>

## Attributions
[Google Books api](https://developers.google.com/books)  
[Hero Pattern](https://heropatterns.com/)  
[Animales Fantastic Font](https://www.fontspace.com/category/fantastic-beasts-and-where-to-find-them)  
[Favicon](https://www.flaticon.com/free-icons/thunder)


## Technologies Used

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Zoom](https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=zoom&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![Google](https://img.shields.io/badge/google-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![Windows Terminal](https://img.shields.io/badge/Windows%20Terminal-%234D4D4D.svg?style=for-the-badge&logo=windows-terminal&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MDN Web Docs](https://img.shields.io/badge/MDN_Web_Docs-black?style=for-the-badge&logo=mdnwebdocs&logoColor=white)
![Stack Overflow](https://img.shields.io/badge/-Stackoverflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white)
![CodePen](https://img.shields.io/badge/Codepen-000000?style=for-the-badge&logo=codepen&logoColor=white)
![Adobe Photoshop](https://img.shields.io/badge/adobe%20photoshop-%2331A8FF.svg?style=for-the-badge&logo=adobe%20photoshop&logoColor=white)
![Adobe Illustrator](https://img.shields.io/badge/adobe%20illustrator-%23FF9A00.svg?style=for-the-badge&logo=adobe%20illustrator&logoColor=white)
![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)
![Safari](https://img.shields.io/badge/Safari-000000?style=for-the-badge&logo=Safari&logoColor=white)
<ul>
  <li>AJAX</li>
  <li>Cloudinary</li>
  <li>Fly.io</li>
</ul>

## Next Steps
We have plans to implement a blog style forum where users can post requests for advice on what they should read next of share their opinions ona book they think... or don't think others should read. 

Additionally, within blogs we want the user to be able to link to shelves or book details from within the forum. This way they can add books they are interested in reading right to a shelf from the forum.

In shelves we would like to add a privacy toggle so that only the user a shelf belongs to could look at it's content if they want it to be that way.

We would also like to implement a color system into our app so that users can choose the color of the backdrop and other various elements to best match their reading mood. This could also include light and dark mode settings.
