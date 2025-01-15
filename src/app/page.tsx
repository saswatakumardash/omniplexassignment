import styles from "@/styles/Home.module.css";
import AuthWrapper from "../components/AuthWrapper";
import MainPrompt from "../components/MainPrompt/MainPrompt";

const Home = () => {
  return (
    <AuthWrapper>
      <div className={styles.main}>
        <MainPrompt />
      </div>
    </AuthWrapper>
  );
};

export default Home;
