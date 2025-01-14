import React, { useState } from "react";
import styles from "./Layout.module.css";
import Image from "next/image";
import Auth from "../Auth/Auth";

const Layout = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  return (
    <div className={`${styles.layout} ${isDarkTheme ? styles.darkTheme : ''}`}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <button className={styles.menuButton}>☰</button>
          <span className={styles.brandName}>Omniplex</span>
        </div>
        <div className={styles.navRight}>
          <button 
            className={styles.themeToggle}
            onClick={() => setIsDarkTheme(!isDarkTheme)}
          >
            {isDarkTheme ? '☀️' : '🌙'}
          </button>
          <button 
            className={styles.newChatBtn}
            onClick={() => setShowAuth(true)}
          >
            <Image
              src="/svgs/new-chat.svg"
              alt="New Chat"
              width={20}
              height={20}
            />
            New Chat
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Where Knowledge Evolves</h1>
        
        <div className={styles.chatContainer}>
          <textarea 
            className={styles.chatInput}
            placeholder="Ask anything..."
            disabled
          />
          <div className={styles.inputControls}>
            <button className={styles.controlBtn}>
              <span>Focus</span>
            </button>
            <button className={styles.controlBtn}>
              <span>Attach</span>
            </button>
            <button className={styles.sendButton} disabled>
              <Image
                src="/svgs/send.svg"
                alt="Send"
                width={16}
                height={16}
              />
            </button>
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      <Auth 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
      />
    </div>
  );
};

export default Layout; 