# teoriainformatyk

teoriainformatyk is a web app for revising to polish INF.02 and INF.03 exams available at [teoriainformatyk.vercel.app](https://teoriainformatyk.vercel.app)

## Features

- One question mode
  - roll and answer to a random question idefinetely
  - see the stats for the current session, including elapsed time and percentage score
  - save questions to two local collections
- Exam mode
  - roll 40 random questions and see the results at the end
  - every score saves locally up to a max of 5 scores
- User panel
  - managing panels for both of the local collections
    - a hard and an easy collection (features coming to them soon)
  - exam score history
- Question search bar
  - search the database for questions by typing in its content

## Technologies used

- Typescript
- NextJS 13 /w App Router
- Tailwind CSS
- Supabase

## SQL Table definition

> [!NOTE]
> Images are stored in a Supabase bucket. Whether a question has an image attached to it is determined by the "image" boolean value within the table

```sql
create table
  public.questions_inf02 (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null,
    content text not null,
    correct_answer text not null,
    image boolean not null,
    answers text[] not null,
    constraint questions_inf02_pkey primary key (id),
    constraint questions_inf02_id_key unique (id)
  ) tablespace pg_default;
```

```sql
create table
  public.questions_inf03 (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null,
    content text not null,
    correct_answer text not null,
    image boolean not null default false,
    answers text[] not null,
    constraint inf03_kopia_pkey primary key (id),
    constraint questions_inf03_id_key unique (id)
  ) tablespace pg_default;
```

## Getting Started

Install required dependencies

```bash
pnpm install
```

Run the development server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
