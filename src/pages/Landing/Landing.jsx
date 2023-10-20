// components 

// css
import styles from './Landing.module.css'
import LinkedInLogo from '../../assets/LIlogo.png';
import GithubLogo from '../../assets/githubWhiteLogo.png';
const Landing = ({ user }) => {
  const renderLink = (logoSrc, altText, linkUrl) => (
    <div className={styles.linkContainer}>
      <a href={linkUrl} target="_blank" rel="noopener noreferrer">
        <img src={logoSrc} alt={altText} className={styles.linkLogo} />
      </a>
    </div>
  );
  return (
    <main className={styles.container}>
      <div className={styles.spacer}></div>

      <section className={styles.landing}>
        <img className={styles.landingTitle} src='src/assets/fantastic books logo.png' />
        {/* <h1 className={styles.landingTitle}>Fantastic Books</h1> */}
        <h2 className={styles.landingSubTitle}>and where to find them.</h2>

        <article className={styles.description}>
          <p className={styles.descriptionText}>
            Welcome to Fantastic Books - your literary Narnia for all bibliophilic delights! Dive 20,000 leagues into a personalized reading odyssey, where you can create custom shelves to curate your tales of wonder and mystery. Whether you're charting the realms of books you've journeyed through, setting sail to the titles on your next adventure list, or unearthing niche categories from the forgotten corners of literature, our platform is your compass. Like Bilbo setting out from the Shire, embark with us and craft your unique literary epic!
          </p>
        </article>
      </section>
      
      <section className={styles.features}>
        <h3>Features of this app:</h3>
          <article className={styles.directions}>
            <div className={styles.featureText}>
              <h4 className="direction-title">Search Book-</h4>
              <p className="direction-text">Discover your next read with our intuitive search feature, powered by the Google Books API. Simply type in a title and explore the vast literary world awaiting your discovery!</p>
            </div>
      
            <div className={styles.featureText}>
              <h4 className="direction-title">Your Shelves-</h4>
              <p className="direction-text">Step into the secret garden of our 'Shelf' feature – a reader's own enchanting alcove in the great library of life! Design your shelves with names as captivating as Pemberley's halls, seamlessly add tales of old and new. For those tales you wish to remain for your eyes only', simply set your shelf to private.</p>
            </div>
      
            {/* <div>
              <h4 className="direction-title">The Forum-</h4>
              <p className="direction-text">Enter the Fantastic Books' Forum, our very own literary round table. Like Dante seeking his path, if you're unsure where your next reading journey should lead, or if you're thoughts not so gently rapping, you've found the right place.</p>
            </div> */}
        </article>
      </section>
          
          
      <section className={styles.devs}>
        <h3 className={styles.devTitle}>The Devs:</h3>
          <div className={styles.devCards}>
            <article className={styles.devCard}>
              {/* <h2>Face</h2> */}
              <h2>Carla Pacheco</h2>
              <div className={styles.linkContainer}>
                {renderLink(LinkedInLogo, "LinkedIn Logo", 'https://www.linkedin.com/in/thecarlapacheco/')}
                {renderLink(GithubLogo, "GitHub Logo", 'https://github.com/cmpacheco23')}
              </div>
            </article>

            <article className={styles.devCard}>
              {/* <h2>Face</h2> */}
              <h2>Enes Velovic</h2>
              <div className={styles.linkContainer}>
                {renderLink(LinkedInLogo, "LinkedIn Logo", 'https://www.linkedin.com/in/enesvelovic/')}
                {renderLink(GithubLogo, "GitHub Logo", 'https://github.com/NSnyc')}
              </div>
            </article>

            <article className={styles.devCard}>
              {/* <h2>Face</h2> */}
              <h2>Steve Morrison</h2>
              <div className={styles.linkContainer}>
                {renderLink(LinkedInLogo, "LinkedIn Logo", 'https://www.linkedin.com/in/steven-ansman-morrison/')}
                {renderLink(GithubLogo, "GitHub Logo", 'https://github.com/venmorr')}
              </div>
            </article>
          </div>
      </section>
    </main>
  )
}

export default Landing
