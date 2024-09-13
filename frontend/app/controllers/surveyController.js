import { useState, useEffect } from 'react';

// Question Services
import { fetchSurveyQuestions } from 'services/question';
// Survey Services
import { fetchLatestSurvey, fetchSurvey, isSurveyReadyForNextDay } from 'services/survey';
// Answer Services
import { fetchSurveyAnswers, updateSurveyAnswers } from 'services/answer';
// Score Services
import { fetchSurveyVersionScore } from 'services/score';

// Daily Survey Services
import { useDailySurvey } from 'context/DailySurveyContext';

// Custom Hook for Survey Data Management
export function useSurveyController(authData, mode, survey_id = null) {
  const { setDailySurveyCompleted } = useDailySurvey();

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [postedAt, setPostedAt] = useState('');
  const [surveyId, setSurveyId] = useState(survey_id);
  const [answers, setAnswers] = useState({});
  const [surveyScore, setSurveyScore] = useState(0);
  const [isNextSurveyReady, setIsNextSurveyReady] = useState(false);

  useEffect(() => {
    async function checkNextSurvey() {
      try {
        const result = await isSurveyReadyForNextDay(authData.id);
        setIsNextSurveyReady(result.status === 'ready' ? true : false);
      } catch (error) {
        console.error("An error occurred while checking the next survey's status:", error);
        setLoading(false);
      }
    }

    async function loadSurveyData() {
      try {
        let surveyResult;

        if (mode === 'current') {
          surveyResult = await fetchLatestSurvey(authData.id);
        } else if (mode === 'past' && survey_id) {
          surveyResult = await fetchSurvey(authData.id, survey_id);
        } else {
          console.error('Invalid mode or missing survey_id for past mode');
          setLoading(false);
          return;
        }

        if (!surveyResult.success) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          return;
        }

        const questionsResult = await fetchSurveyQuestions(authData.id, surveyResult.id);

        if (!questionsResult.success) {
          console.error(questionsResult.message);
          setLoading(false);
          return;
        }

        setPostedAt(surveyResult.postedAt);
        setSurveyId(surveyResult.id);

        const scoreResult = await fetchSurveyVersionScore(surveyId);
        setSurveyScore(scoreResult.score);

        await loadAnswers(surveyResult, questionsResult);
      } catch (error) {
        console.error('An error occurred while loading survey data:', error);
        setLoading(false);
      }
    }

    async function loadAnswers(surveyResult, questionsResult) {
      const answersResult = await fetchSurveyAnswers(authData.id, surveyResult.id);

      if (answersResult.success) {
        const combinedQuestions = questionsResult.questions.map((question) => {
          const matchingAnswer = answersResult.answers.find(
            (answer) => answer.question_id === question.id || answer.question === question.text
          );
          return {
            ...question,
            type: matchingAnswer?.type || null,
            comment: matchingAnswer?.comment || '',
          };
        });

        setQuestions(combinedQuestions);

        const filteredAnswers = combinedQuestions.reduce((acc, question) => {
          if (question.id) {
            acc[question.id] = {
              type: question.type,
              comment: question.comment,
            };
          }
          return acc;
        }, {});

        setAnswers(filteredAnswers);
      } else {
        console.error(answersResult.message);
        setQuestions(questionsResult.questions);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    }

    if (authData?.id) {
      checkNextSurvey();
      loadSurveyData();
    } else {
      console.error('User ID is missing in authData');
      setLoading(false);
    }
  }, [authData.id]);

  // Handle Answer Update
  const handleAnswerUpdate = (questionId, answer, comment) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === questionId ? { ...q, type: answer, comment: comment } : q))
    );
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: { type: answer, comment },
    }));
  };

  // Handle Survey Submission
  const handleSubmit = async (navigation) => {
    const filteredAnswers = Object.entries(answers).reduce((acc, [questionId, answer]) => {
      if (questionId !== 'undefined' && questionId) {
        acc[questionId] = {
          question_id: questionId,
          type: answer.type,
          comment: answer.comment,
        };
      }
      return acc;
    }, {});

    const submitResult = await updateSurveyAnswers(authData.id, surveyId, filteredAnswers);
    if (submitResult.success) {
      setDailySurveyCompleted(true);
      navigation.navigate('Completion');
    } else {
      console.error(submitResult.message);
    }
  };

  // Format Date
  const formattedDate = postedAt
    ? (() => {
        const date = new Date(postedAt);
        const day = date.getUTCDate();
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const ordinalSuffix = (day) => {
          if (day > 3 && day < 21) return 'th';
          switch (day % 10) {
            case 1:
              return 'st';
            case 2:
              return 'nd';
            case 3:
              return 'rd';
            default:
              return 'th';
          }
        };
        return `${day}${ordinalSuffix(day)} of ${month}`;
      })()
    : 'Loading date...';

  return {
    questions,
    loading,
    formattedDate,
    handleAnswerUpdate,
    handleSubmit,
    surveyScore,
    isNextSurveyReady,
  };
}
