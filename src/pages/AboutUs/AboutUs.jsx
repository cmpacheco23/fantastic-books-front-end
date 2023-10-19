// css
import styles from './AboutUs.module.css'
import LinkedInLogo from '../../assets/LIlogo.png';
import GithubLogo from '../../assets/githubWhiteLogo.png';
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
          <h2>Face</h2>
          <h2>Carla Pacheco</h2>
          <p>
          Software Engineer passionate about crafting technical solutions that bridge the gap between client needs and innovative products. My background is in marketing and e-commerce, primarily within MarTech and SaaS companies.
          </p>
          <div className={styles.links}>
          {renderLink(LinkedInLogo, "LinkedIn Logo", 'https://www.linkedin.com/in/thecarlapacheco/')}
            {renderLink(GithubLogo, "GitHub Logo", 'https://github.com/cmpacheco23')}
          </div>
        </div>
          
        <div>
          <h2>Face</h2>
          <h2>Enes Velovic</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, reprehenderit explicabo! Facere enim qui quibusdam ea ex, sapiente odio. Nam magnam voluptatibus quasi explicabo natus dolorum perferendis deserunt omnis adipisci!
          </p>
          <div className={styles.links}>
          {renderLink(LinkedInLogo, "LinkedIn Logo", 'https://www.linkedin.com/in/enesvelovic/')}
            {renderLink(GithubLogo, "GitHub Logo", 'https://github.com/NSnyc')}
          </div>
        </div>
          
        <div>
          <h2>Face</h2>
          <h2>Steve Morrison</h2>
          <p>
          An imaginative full stack Software Developer with an eye for details, ingenuity, and progress. I use my background in behavioral analysis, my skills in various technologies, and a passion to drive insightful, innovative, and impactful solutions to develop smarter applications with the user in mind.
          </p>
          <div className={styles.links}>
          {renderLink(LinkedInLogo, "LinkedIn Logo", 'https://www.linkedin.com/in/steven-ansman-morrison/')}
            {renderLink(GithubLogo, "GitHub Logo", 'https://github.com/venmorr')}
          </div>
        </div>
        </section>
      </main>
    </>
  )
}

export default AboutUs