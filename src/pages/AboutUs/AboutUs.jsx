// css
import styles from './AboutUs.module.css'
import LinkedInLogo from '/assets/LIlogo.png';
import GithubLogo from '/assets/githubWhiteLogo.png';
import carla from '/assets/carla.png'
import steven from '/assets/steven.png'
import enes from '/assets/enes.png'
const AboutUs = () => {
  const renderLink = (logoSrc, altText, linkUrl) => (
    <div className={styles.linkContainer}>
      <a href={linkUrl} target="_blank" rel="noopener noreferrer">
        <img src={logoSrc} alt={altText} className={styles.linkLogo} />
      </a>
    </div>
  )

    
  return ( 
    <>
      <div className={styles.spacer}></div>
      <main>
        <h1 className={styles.title}>Meet the Devs</h1>
        <section className={styles.devCard}>
        <div>
        <img src={carla} alt="Carla's Profile Photo" className={styles.devPhoto} />
          <h2 className={styles.devName}>Carla Pacheco</h2>
          <div className={styles.links}>
          {renderLink(LinkedInLogo, "LinkedIn Logo", 'https://www.linkedin.com/in/thecarlapacheco/')}
            {renderLink(GithubLogo, "GitHub Logo", 'https://github.com/cmpacheco23')}
          </div>
          <p className={styles.devDescription}>
          Software Engineer passionate about crafting technical solutions that bridge the gap between client needs and innovative products. My background is in marketing and e-commerce, primarily within MarTech and SaaS companies.
          </p>
        </div>
          
        <div>
        <img src={enes} alt="Enes' Profile Photo" className={styles.devPhoto} />
          <h2 className={styles.devName}>Enes Velovic</h2>
          <div className={styles.links}>
          {renderLink(LinkedInLogo, "LinkedIn Logo", 'https://www.linkedin.com/in/enesvelovic/')}
            {renderLink(GithubLogo, "GitHub Logo", 'https://github.com/NSnyc')}
          </div>
          <p className={styles.devDescription}>
          Software Engineer with a background in business and finance, holding a degree in Business Administration and Management. My passion lies in problem-solving, learning, and delivering high-quality products and services that exceed client and stakeholder expectations.
          </p>
        </div>
          
        <div>
          <img src={steven} alt="Steven's Profile Photo" className={styles.devPhoto} />
          <h2 className={styles.devName}>Steve Morrison</h2>
          <div className={styles.links}>
          {renderLink(LinkedInLogo, "LinkedIn Logo", 'https://www.linkedin.com/in/steven-ansman-morrison/')}
            {renderLink(GithubLogo, "GitHub Logo", 'https://github.com/venmorr')}
          </div>
          <p className={styles.devDescription}>
          An imaginative full stack Software Developer with an eye for details, ingenuity, and progress. I use my background in behavioral analysis, my skills in various technologies, and a passion to drive insightful, innovative, and impactful solutions to develop smarter applications with the user in mind.
          </p>
        </div>
        </section>
      </main>
    </>
  )
}

export default AboutUs