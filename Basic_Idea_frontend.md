I am making an application that will capture the mood of the students. I will inform you on how the application frontend is and after that I want you to give me ideas about the database. I want you to tell me which database type (relational or non-relational) is better for the implementation and also which would be the tables and the data props and possible connections between the tables.

The frontend of the application:
You enter the application and there 2 options. Either sign in with email and password or sign up with first name, last name, email, password and password confirmation.
We have 5 different emoji types, awful - sad - neutral - good - happy and they are assigned to values 1 - 2 - 3 - 4 - 5 respectively. So basically the emojis will be saved as numbers from 1 to 5 in the database.
After that we have surveys that have 3 answer types (selecting 1 emoji between 5 different ones, keywords selection and free text), but emoji is mandatory in order for a question to be considered as answered, otherwise the user skips the question. Also every survey is saved by date. So the information is not required to be given.
We also have a diary that takes as information the date, hour, photo uri and text. So the information is not required to be given.
We also ask the user to select one emoji for the welcoming question which is "How are you feeling today?".
Also the application should save if the user has a streak or not (boolean), and that depends on if he answers the survey for more then one consecutive day (hasStreak = 1), and when he fails hasStreak goes to 0.

Now give me ideas for the database.
