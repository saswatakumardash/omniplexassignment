import React, { useState } from "react";
import styles from "./Auth.module.css";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setAuthState, setUserDetailsState } from "@/store/authSlice";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Auth = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  if (!isOpen) return null;

  const handleAuth = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      if (result.user) {
        const userRef = doc(db, "users", result.user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: result.user.email,
            name: result.user.displayName,
            photoURL: result.user.photoURL,
            createdAt: serverTimestamp(),
          });
        }

        dispatch(setAuthState(true));
        dispatch(setUserDetailsState({
          uid: result.user.uid,
          email: result.user.email as string,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
        }));
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${styles.authPage} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <button className={styles.backButton} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className={styles.brandName}>Omniplex</span>
        </div>
        <div className={styles.navRight}>
          <button className={styles.themeToggle} onClick={toggleTheme}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>
      </nav>

      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.authSection}>
            <h1 className={styles.title}>Your ideas,</h1>
            <h1 className={styles.title}>amplified</h1>
            <p className={styles.subtitle}>
              Privacy-first AI that helps you create in confidence.
            </p>

            <div className={styles.authContainer}>
              <button 
                className={styles.googleButton}
                onClick={handleAuth}
                disabled={loading}
              >
                <Image
                  src="/svgs/Google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                Continue with Google
              </button>

              <div className={styles.divider}>OR</div>

              <input
                type="email"
                placeholder="Enter your personal or work email"
                className={styles.emailInput}
              />
              <button className={styles.emailButton}>
                Continue with email
              </button>

              <p className={styles.terms}>
                By continuing, you agree to Omniplex's{" "}
                <a href="/terms">Consumer Terms</a> and{" "}
                <a href="/privacy">Privacy Policy</a>
              </p>
            </div>

            <button className={styles.learnMore}>
              Learn more ↓
            </button>
          </div>

          <div className={styles.featureSection}>
            <h2 className={styles.featureTitle}>Meet Omniplex</h2>
            <p className={styles.featureSubtitle}>
              A next generation AI assistant built to be safe, accurate, and secure.
            </p>

            <div className={styles.featureGrid}>
              <div className={styles.feature}>
                <h3>Create with Omniplex</h3>
                <p>Draft and iterate on websites, graphics, documents, and code alongside your chat.</p>
              </div>
              <div className={styles.feature}>
                <h3>Bring your knowledge</h3>
                <p>Upload files and share links to give Omniplex more context.</p>
              </div>
              <div className={styles.feature}>
                <h3>Share and collaborate</h3>
                <p>Work together with your team in real-time.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
