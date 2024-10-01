frontend
|-- App.js
|-- Dockerfile
|-- app
| |-- assets
| | |-- app-images
| | | |-- adaptive-icon-2.png
| | | |-- adaptive-icon-3.png
| | | |-- adaptive-icon.png
| | | |-- favicon.png
| | | |-- icon-2.png
| | | |-- icon-3.png
| | | |-- icon.png
| | | |-- splash-2.png
| | | |-- splash-3.png
| | | |-- splash.png
| | |-- fonts
| | | |-- FjallaOne-Regular.ttf
| | | |-- Outfit-Bold.ttf
| | | |-- Outfit-Medium.ttf
| | | |-- Outfit-Regular.ttf
| | | |-- PressStart2P-Regular.ttf
| | | |-- Roboto-Bold.ttf
| | | |-- Roboto-BoldItalic.ttf
| | | |-- Roboto-Italic.ttf
| | | |-- Roboto-Medium.ttf
| | | |-- Roboto-MediumItalic.ttf
| | | |-- Roboto-Regular.ttf
| | | |-- SF-Pro-Display-Regular.otf
| | | |-- SF-Pro-Display-Semibold.otf
| | | |-- SedgwickAveDisplay-Regular.ttf
| | |-- images
| | | |-- blueGreenWaves.png
| | | |-- blueWaves.png
| | | |-- greenWaves.png
| | | |-- spaceImage.png
| | | |-- spaceImage2.png
| | | |-- tirchuazWaves.png
| | | |-- todaysSurvey-2.png
| | | |-- todaysSurvey-3.png
| | | |-- todaysSurvey-4.png
| | | |-- todaysSurvey.png
| | | |-- trophy.png
| | | |-- tsaperlein.png
| | | |-- whitePaperTexture.png
| | |-- lottie-animations
| | | |-- 404-dino-animation.json
| | | |-- autumn-animation.json
| | | |-- beach-animation.json
| | | |-- black-dino-animation.json
| | | |-- chill-animation.json
| | | |-- connecting-animation.json
| | | |-- loading-animation.json
| | | |-- meditating-animation.json
| | | |-- splashscreen-2.json
| | | |-- splashscreen.json
| | | |-- tick-animation.json
| | | |-- trophy-animation.json
| | | |-- white-dino-animation.json
| | | |-- windmill-animation.json
| | |-- message-images
| | |-- bad-2.png
| | |-- bad-3.png
| | |-- bad-4.png
| | |-- bad-5.png
| | |-- bad-6.png
| | |-- bad.png
| | |-- good-2.png
| | |-- good-3.png
| | |-- good-4.png
| | |-- good-5.png
| | |-- good-6.png
| | |-- good.png
| | |-- green-2.png
| | |-- green-3.png
| | |-- green.png
| | |-- mid-2.png
| | |-- mid-3.png
| | |-- mid-4.png
| | |-- mid-5.png
| | |-- mid-6.png
| | |-- mid.png
| |-- components
| | |-- AnswerSelector.jsx
| | |-- Button.jsx
| | |-- CalendarOptions.jsx
| | |-- DailyMood.jsx
| | |-- Emoji.jsx
| | |-- EmojiSelector.jsx
| | |-- EmotionLegend.jsx
| | |-- GoBackButton.jsx
| | |-- HeaderAvatar.jsx
| | |-- HeaderTitle.jsx
| | |-- InformationLabel.jsx
| | |-- LabelInput.jsx
| | |-- Message.jsx
| | |-- MonthlyStats.jsx
| | |-- MoodBarChart.jsx
| | |-- MoodCalendar.jsx
| | |-- MoodPieChart.jsx
| | |-- MyModal.jsx
| | |-- PreviousSurvey.jsx
| | |-- SideButton.jsx
| | |-- SurveyButtons.jsx
| | |-- WeeklyStats.jsx
| |-- config
| | |-- animationConfig.js
| | |-- borderConfig.js
| | |-- messageConfig.js
| | |-- moodConfig.js
| | |-- shadowConfig.js
| |-- constants
| | |-- colors.js
| | |-- dimensions.js
| | |-- fonts.js
| |-- context
| | |-- AuthContext.js
| | |-- DailySurveyContext.js
| | |-- MoodContext.js
| | |-- ProfileContext.js
| |-- controllers
| | |-- appController.js
| | |-- calendarController.js
| | |-- graphController.js
| | |-- homeController.js
| | |-- mainNavigatorController.js
| | |-- messageController.js
| | |-- profileController.js
| | |-- questionnairesController.js
| | |-- signInUpController.js
| | |-- surveyController.js
| | |-- weeklyStatsController.js
| | |-- welcomeController.js
| |-- navigators
| | |-- BottomNavigator.jsx
| | |-- MainNavigator.jsx
| | |-- StartNavigator.jsx
| | |-- StatsNavigator.jsx
| | |-- SurveyNavigator.jsx
| |-- screens
| | |-- Layout.jsx
| | |-- extras
| | | |-- AppLoading.jsx
| | | |-- Completion.jsx
| | | |-- Connecting.jsx
| | | |-- NoSurvey404.jsx
| | | |-- Splashscreen.jsx
| | |-- main
| | | |-- Home.jsx
| | | |-- Profile.jsx
| | | |-- Questionnaires.jsx
| | |-- password
| | | |-- PasswordReset.jsx
| | | |-- RequestPasswordReset.jsx
| | |-- start
| | | |-- SignIn.jsx
| | | |-- SignUp.jsx
| | | |-- Welcome.jsx
| | |-- stats
| | | |-- Calendar.jsx
| | | |-- Graph.jsx
| | |-- survey
| | |-- SurveyQuestion.jsx
| |-- services
| | |-- answer.js
| | |-- auth.js
| | |-- message.js
| | |-- moodLevel.js
| | |-- participation.js
| | |-- question.js
| | |-- score.js
| | |-- survey.js
| | |-- user.js
| | |-- welcomeMood.js
| |-- utilities
| | |-- datetime.js
| | |-- hash.js
| | |-- image.js
| | |-- moodUtils.js
| | |-- ratioUtils.js
|-- app.json
|-- babel.config.js
|-- eas.json
|-- eslint.config.mjs
|-- jsconfig.json
|-- metro.config.js
|-- package-lock.json
|-- package.json
|-- react-native.config.js

Simpler Version:
frontend
|-- App.js
|-- Dockerfile
|-- app
| |-- assets
| | |-- app-images
| | |-- fonts
| | |-- images
| | |-- lottie-animations
| | |-- message-images
| |-- components
| |-- config
| |-- constants
| |-- context
| |-- controllers
| |-- navigators
| |-- screens
| | |-- Layout.jsx
| | |-- extras
| | |-- main
| | |-- password
| | |-- start
| | |-- stats
| | |-- survey
| |-- services
| |-- utilities
|-- app.json
|-- babel.config.js
|-- eas.json
|-- eslint.config.mjs
|-- jsconfig.json
|-- metro.config.js
|-- package-lock.json
|-- package.json
|-- react-native.config.js

app folder:
.
├── assets
├── components
├── config
├── constants
├── context
├── controllers
├── navigators
├── screens
├── services
└── utilities
