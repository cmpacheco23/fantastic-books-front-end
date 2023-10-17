// components 

// css
import styles from './Landing.module.css'

const Landing = ({ user }) => {
  return (
    <>
    <div className={styles.spacer}></div>
      <main className={styles.container}>
        <section className={styles.landing}>

          {/* {user 
            ? 'Welcome to' 
          : 'Log in to enjoy'
          } */}
      
          <h1 className={styles.landingTitle}>
              Fantastic Books
          </h1>
      
          <h2 className={styles.landingSubTitle}>
              and where to find them.
          </h2>

          <div className="app-description">
            <p className={styles.description}>
              Welcome to Fantastic Books - your literary Narnia for all bibliophilic delights! Dive 20,000 leagues into a personalized reading odyssey, where you can create custom shelves to curate your tales of wonder and mystery. Whether you're charting the realms of books you've journeyed through, setting sail to the titles on your next adventure list, or unearthing niche categories from the forgotten corners of literature, our platform is your compass. Like Bilbo setting out from the Shire, embark with us and craft your unique literary epic!
            </p>
          </div>
        </section>
        
        <div>

        <h3>How to use this app:</h3>

        <section className={styles.directions}>
        
        
            <div>
              <h4 className="direction-title">
              Search Book-
              </h4>
              <p className="direction-text">
            Discover your next read with our intuitive search feature, powered by the Google Books API. Simply type in a title and explore the vast literary world awaiting your discovery! 
              </p>
            </div>
        
            <div>
              <h4 className="direction-title">
              Your Shelves-
              </h4>
              <p className="direction-text">
            Step into the secret garden of our 'Shelf' feature – a reader's own enchanting alcove in the great library of life! Design your shelves with names as captivating as Pemberley's halls, seamlessly add tales of old and new. For those tales you wish to remain for your eyes only', simply set your shelf to private.
              </p>
            </div>
        
            <div>
              <h4 className="direction-title">
              The Forum-
              </h4>
              <p className="direction-text">
            Enter the Fantastic Books' Forum, our very own literary roundtable. Like Dante seeking his path, if you're unsure where your next reading journey should lead, or if you're thoughts not so gently rapping, you've found the right place.
              </p>
            </div>
          </section>
        </div>
            
        <h3>About the Devs:</h3>
            
        <section className={styles.about}>

          <div>
            <h2>Face</h2>
            <h2>Carla Pacheco</h2>
            <div>
              <a href='https://www.linkedin.com/in/thecarlapacheco/'>LI</a>
              <a href='https://github.com/cmpacheco23'>GH</a>
            </div>
          </div>
          
          <div>
            <h2>Face</h2>
            <h2>Enes Velovic</h2>
            <div>
              <a href='https://www.linkedin.com/in/enesvelovic/'>LI</a>
              <a href='https://github.com/NSnyc'>GH</a>
            </div>
          </div>
          
          <div>
            <h2>Face</h2>
            <h2>Steve Morrison</h2>
            <div>
              <a href='https://www.linkedin.com/in/steven-ansman-morrison/'>LI</a>
              <a href='https://github.com/venmorr'>GH</a>
            </div>
          </div>
        
        </section>
      </main>
      </>
  )
}

export default Landing
