# Non-Relational (MongoDB) Database

## Collection Structure

### User

- \_id: ObjectId
- first_name: String
- last_name: String
- email: String
- password: String
- streak_count: Number
- created_at: Date

### Survey

- \_id: ObjectId
- user_id: ObjectId (reference to User)
- date: Date
- daily_emoji: Number (1-5)
- questions: Array of Subdocuments
  - question_id: ObjectId (reference to Question)
  - emoji: Number (1-5)
  - keywords_selected: Array of Strings
  - comment: String

### Question

- \_id: ObjectId
- text: String
- keywords: Array of Strings

### DiaryPage

- \_id: ObjectId
- user_id: ObjectId (reference to User)
- date: Date
- hour: String
- photo_uri: String
- text: String

## Relationships and Queries

1. Users and Surveys:

Each user can have multiple surveys. The Survey collection will store a reference to the User it belongs to.

2. Surveys and Questions:

Each survey can contain multiple questions. The Survey collection will store an array of question subdocuments, each containing the answer details.

3. Users and DiaryPages:

Each user can have multiple diary entries. The DiaryPage collection will store a reference to the User it belongs to.
Example Documents

## Data Structures

### User

```json
{
    "_id": ObjectId("..."),
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "password": "hashed_password",
    "has_streak": true,
    "last_survey_date": ISODate("2024-07-03T00:00:00Z"),
    "created_at": ISODate("2024-01-01T00:00:00Z")
}
```

### Survey

```json
{
    "\_id": ObjectId("..."),
    "user_id": ObjectId("..."),
    "date": ISODate("2024-07-03T00:00:00Z"),
    "daily_emoji": 3,
    "questions": [
        {
            "question_id": ObjectId("..."),
            "emoji": 4,
            "keywords_selected": ["happy", "productive"],
            "comment": "Feeling great!"
        },
        {
            "question_id": ObjectId("..."),
            "emoji": 3,
            "keywords_selected": ["excited"],
            "comment": "Average day."
        }
    ]
}
```

### Question

```json
{
    "\_id": ObjectId("..."),
    "text": "How do you feel about today's lesson?",
    "keywords": ["confused", "understood", "happy", "bored", "excited"]
}
```

### DiaryPage

```json
{
    "\_id": ObjectId("..."),
    "user_id": ObjectId("..."),
    "date": ISODate("2024-07-03T00:00:00Z"),
    "hour": "14:00",
    "photo_uri": "path/to/photo.jpg",
    "text": "Today was a productive day."
}
```
