import React, { useState } from 'react';
import styles from './TextAnalysis.module.css';
import { analyzeText, extractKeyPhrases } from '@/services/textAnalysis';

const TextAnalysis = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState<any>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const [sentimentResult, keywordsResult] = await Promise.all([
        analyzeText(text),
        extractKeyPhrases(text)
      ]);

      setSentiment(sentimentResult);
      setKeywords(keywordsResult.keywords || []);
    } catch (err) {
      setError('Failed to analyze text. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Text Analysis</h2>
      
      <div className={styles.inputSection}>
        <textarea
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze..."
          rows={5}
        />
        
        <button 
          className={styles.analyzeButton}
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Text'}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {sentiment && (
        <div className={styles.results}>
          <div className={styles.sentimentSection}>
            <h3>Sentiment Analysis</h3>
            <div className={styles.sentimentResult}>
              <div className={styles.sentimentScore}>
                <span>Score: {sentiment.aggregate_sentiment.score}</span>
                <span className={styles.sentiment}>
                  {sentiment.aggregate_sentiment.sentiment}
                </span>
              </div>
            </div>
          </div>

          {keywords.length > 0 && (
            <div className={styles.keywordsSection}>
              <h3>Key Phrases</h3>
              <div className={styles.keywordsList}>
                {keywords.map((keyword, index) => (
                  <span key={index} className={styles.keyword}>
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TextAnalysis; 