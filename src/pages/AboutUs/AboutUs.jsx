// css
import styles from './AboutUs.module.css'

const AboutUs = () => {
  return ( 
    <>
      <main>
        <h1>Meet the Devs</h1>
        <section className={styles.devCard}>
        <div>
            <h2>Face</h2>
            <h2>Carla Pacheco</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, reprehenderit explicabo! Facere enim qui quibusdam ea ex, sapiente odio. Nam magnam voluptatibus quasi explicabo natus dolorum perferendis deserunt omnis adipisci!
            </p>
            <div className={styles.links}>
              <a href='https://www.linkedin.com/in/thecarlapacheco/'>LI</a>
              <a href='https://github.com/cmpacheco23'>GH</a>
            </div>
          </div>
          
          <div>
            <h2>Face</h2>
            <h2>Enes Velovic</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, reprehenderit explicabo! Facere enim qui quibusdam ea ex, sapiente odio. Nam magnam voluptatibus quasi explicabo natus dolorum perferendis deserunt omnis adipisci!
            </p>
            <div className={styles.links}>
              <a href='https://www.linkedin.com/in/enesvelovic/'>LI</a>
              <a href='https://github.com/NSnyc'>GH</a>
            </div>
          </div>
          
          <div>
            <h2>Face</h2>
            <h2>Steve Morrison</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, reprehenderit explicabo! Facere enim qui quibusdam ea ex, sapiente odio. Nam magnam voluptatibus quasi explicabo natus dolorum perferendis deserunt omnis adipisci!
            </p>
            <div className={styles.links}>
              <a href='https://www.linkedin.com/in/steven-ansman-morrison/'>LI</a>
              <a href='https://github.com/venmorr'>GH</a>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}

export default AboutUs