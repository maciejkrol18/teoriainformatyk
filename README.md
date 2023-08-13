# teoriainformatyk

teoriainformatyk is a web app for revising to polish INF.02 and INF.03 exams

## Features

- One question mode
- Exam mode
- Exam score history
- List of hard/easy questions modifiable by the user
- Question search bar

## Technologies used

- Typescript
- NextJS 13 /w App Router
- Tailwind CSS
- Supabase

## SQL Table definition

There's a table for each set of exam questions. Replace "123" with the qualification name e.g. "inf.02".
Images are stored as base64 strings.

```sql
create table
  public.questions_123 (
    id bigint not null,
    created_at timestamp with time zone null,
    content text not null,
    answers jsonb not null,
    correctAnswer text not null,
    image text null,
    constraint questions_123_new_pkey primary key (id)
  ) tablespace pg_default;
```

## Getting Started

Install required dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
