import { useState, useEffect } from 'react';

// Message Services
import { fetchMessageByLevel } from 'services/message';

export const useMessageController = (category) => {
  const [userMessage, setUserMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMessage = async () => {
      try {
        const result = await fetchMessageByLevel(category);
        if (result.success) {
          setUserMessage(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('An error occurred while fetching the message.');
      } finally {
        setLoading(false);
      }
    };

    loadMessage();
  }, [category]);

  return { userMessage, loading };
};
