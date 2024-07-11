# Relational (PostgreSQL) Database

## Table Structure

### User

- id: Primary Key, Serial
- first_name: VARCHAR(100)
- last_name: VARCHAR(100)
- email: VARCHAR(100), Unique
- password: TEXT
- streak_count: SMALLINT
- created_at: DATE

### Survey

- id: Primary Key, Serial
- user_id: Foreign Key (references users.id)
- date: DATE

### Question

- id: Primary Key, Serial
- text: TEXT
- keywords: TEXT[] (PostgreSQL array type)

### Answer

- id: Primary Key, Serial
- survey_id: Foreign Key (references surveys.id)
- question_id: Foreign Key (references questions.id)
- emoji: SMALLINT (1-5)
- keywords_selected: TEXT[] (PostgreSQL array type)
- comment: TEXT

### DiaryPage

- id: Primary Key, Serial
- user_id: Foreign Key (references users.id)
- datetime: TIMESTAMP
- photo_uri: TEXT
- text: TEXT

## Relationships

- Users and Surveys:

Many-to-Many (One user can have multiple surveys. Also a survey could be assigned to multiple users)

- Surveys and Answers:

One-to-Many (One survey can have multiple answers)

- Questions and Answers:

One-to-Many (One question can have multiple answers in different surveys)

- Users and DiaryPages:

One-to-Many (One user can have multiple diary entries)

## Example SQL Definitions

```sql
CREATE TABLE User (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    streak_count SMALLINT NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE Survey (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    date DATE NOT NULL,
    daily_emoji SMALLINT NOT NULL CHECK (daily_emoji BETWEEN 1 AND 5)
);

CREATE TABLE Question (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    keywords TEXT[] NOT NULL
);

CREATE TABLE Answer (
    id SERIAL PRIMARY KEY,
    survey_id INTEGER REFERENCES surveys(id),
    question_id INTEGER REFERENCES questions(id),
    emoji SMALLINT NOT NULL CHECK (emoji BETWEEN 1 AND 5),
    keywords_selected TEXT[],
    comment TEXT
);

CREATE TABLE DiaryPage (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    datetime TIMESTAMP NOT NULL,
    photo_uri TEXT,
    text TEXT
);
```
