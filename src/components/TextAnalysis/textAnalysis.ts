const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;
const RAPID_API_HOST = 'text-analysis12.p.rapidapi.com';

export const analyzeText = async (text: string) => {
  const url = 'https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1';
  
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': RAPID_API_KEY!,
      'X-RapidAPI-Host': RAPID_API_HOST
    },
    body: JSON.stringify({
      language: 'english',
      text: text
    })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error analyzing text:', error);
    throw error;
  }
};

export const extractKeyPhrases = async (text: string) => {
  const url = 'https://text-analysis12.p.rapidapi.com/keywords-extraction/api/v1.1';
  
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': RAPID_API_KEY!,
      'X-RapidAPI-Host': RAPID_API_HOST
    },
    body: JSON.stringify({
      language: 'english',
      text: text
    })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error extracting keywords:', error);
    throw error;
  }
};
