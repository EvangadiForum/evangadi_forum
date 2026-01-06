import { Link } from "react-router-dom";
//import styles from "./About.module.css";
import styles from "../../pages/login/Login.module.css";

const About = () => {
  return (
    <div className={styles.aboutSection}>
      <div className={styles.aboutContent}>
        <p className={styles.aboutLabel}>About</p>
        <h2>EvaFor Q&A</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          numquam quas recusandae facere adipisci amet consectetur iste ab
          asperiores, harum, ipsum, reiciendis atque facilis qui labore enim
          totam magni esse!
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora nam
          sunt quo blanditiis voluptas maxime beatae animi molestias architecto
          alias commodi quas, consectetur cum accusamus temporibus aspernatur!
          Voluptas, modi nisi.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
          ab, ad voluptatum cupiditate blanditiis exercitationem ipsam.
          Incidunt, voluptatum minima facere quas vel fuga iusto optio deserunt
          magnam ipsa fugiat iure?
        </p>
        <div>
          <Link to="/how-it-works">
            <button className={styles.howItWorksBtn}>How It Works</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
