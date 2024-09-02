Now I will tell you all the tasks that I want to be done

- Surveys
  I want to create a surveyVersion every day, but with the condition that the user has answered the previous surveyVersion. Also it needs to be created on a specific time of the day (example 22:00 every day). So iwant you to check for the latest surveyVersioin, find if all the questions are answered, and if they are, then create the new surveyVersion. If the user hasn't answered all the questions or any of the questions, then do nothing.
  If the user is new, and there is no previous surveyVersion, of course create one at 22:00 as we said.

Another thing that I want you to do is, to update the survey answers only if the user has answered to all the questions, and only at 23:59 (at the end of the day). If the user hasn't answered to all the questions, then don't update anything, and the next day he will get the same surveyVersion. But for this I have already created the function that updates the survey. I just need you to modify the code as I asked above.

- Notifications
  For the notifications every user need to have a token in order to send specific notifications to each user. But the problem is that I already have 2 users in the database and a lot of data are connected to them. How can I do it so that I just create a new column "token" in the database, and just give these 2 users a token. After that I should be a ble to use these tokens to send them notifications. Tell me how I should do this

The other thing is that, I want the user to receive a notification every time the new surveyVersion is being created, so it doesn't depend on a specific time, but on the time of the new surveyVersion. Also when the program checks if the user has fulfilled all the conditions in order to get a new surveyVersion, if he hasn't fulfilled them, then he will get a notification, that "Please complete the survey from yesterday".

The other thing I want to do is to make a scheduled notifications every day that will happen at 22:00 and that will remind the user to answer the survey.
