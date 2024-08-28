<div align='center'>
  
  # [![logo](https://github.com/maciejkrol18/teoriainformatyk/blob/main/public/logo-big-dark.svg)](https://teoriainformatyk.pl)

  <br>
  
  [![production status](https://img.shields.io/website?url=https%3A%2F%2Fteoriainformatyk.pl&up_message=online&up_color=%23441b9d&down_message=offline&down_color=critical&label=production&labelColor=%23171517)](https://teoriainformatyk.pl)
  [![preview status](https://img.shields.io/website?url=https%3A%2F%2Fteoriainformatyk-git-dev-maciejkrol18s-projects.vercel.app%2F&up_message=online&up_color=%23441b9d&down_message=offline&down_color=critical&label=preview&labelColor=%23171517)](https://teoriainformatyk.pl) <br>
  ![nextjs 14](https://img.shields.io/badge/NextJS_14-black?logo=nextdotjs)
  ![vercel](https://img.shields.io/badge/Vercel-black?logo=vercel&color=black)
  ![tailwind](https://img.shields.io/badge/Tailwind_CSS-turquoise?logo=tailwindcss&color=%230d6675)
  ![supabase](https://img.shields.io/badge/Supabase-green?logo=supabase&color=%23268057)
  ![typescript](https://img.shields.io/badge/TypeScript-blue?logo=typescript&color=%2322548c)
  ![biome](https://img.shields.io/badge/Biome-blue?logo=biome&color=%23324c6b)


</div>

## 💡 About

teoriainformatyk is a free and open source web app for revising to the quiz part of polish INF.02/EE.08 and INF.03/EE.09/E.14 IT technician exams available at [teoriainformatyk.pl](https://teoriainformatyk.pl)

## 👨‍🎓 Ways to revise

`*` - requires to be signed in <br>

### One Question
- Keep rolling a random question and answering it as long as you like
- See the stats for the current session, including
  - time spent
  - number of correct and incorrect answers
  - amount of rolled questions
  - percentage score
- Save the amount of total correct and incorrect answers given in this mode and view the stats in your dashboard*
- If you find a question to be especially hard, add it to your personal "hard questions collection" to activate hard mode during which only questions from that collection appear*
- View information about the current question with the option to report any encountered mistakes
### Exam
- Roll 40 random questions, answer them, and see the results at the end
- The score gets saved and you can browse your scores in the dashboard*
### Flashcards*
- Go through each available question one by one and save your progress
- Come back and start where you left off
- Reset your progress at any moment if you wish to
### Question browser
- Search through the questions available in the database by typing in a query
- Filter the questions by the exam qualification and whether they have an image attached to them or not
- Sort the questions by their ID or alphabetically
- The search page is also where you access your hard questions collections, which you do by applying the "Tylko zbiór trudnych" filter**
### SQL Training
*INF.03 only*
- Roll a random query related task from one of the past exams
- Autofill the code input if you're not sure of the right answer
- Access a separate repository (not made by me) with all of the files (such as .PDFs) regarding the exam through a link

## 👤 User features
You can create an account by signing up using an email and a password, or by using one of the social login providers (currently Google and Discord are available). A single user can sign in using multiple authentication methods (e.g. if you signed up using the email johndoe[at]mail.com, you can sign in to the same account using Discord if the discord account is also linked to the johndoe[at]mail.com address). Here's the rest of the features regarding a user:
### Dashboard
Here's what you see on the dashboard's homepage:
- One Question and Flashcards stats
  - See the percentage of correct answers given in one question mode
  - See how much questions you have left to go through in flashcards
- Latest 5 exams you took
- A link to the list of questions in your hard questions collection* (which is accessed through the question browser)
- Metadata about your account
- Buttons with links to:
  - Password change form - change the password currently being used to access the account through the email and password combination
  - Stats reset form - clear your one question stats, flashcards progress and exam history all at the same time
  - Account deletion form - delete your account purging all of the data associated to your user id in the database
  - Help form - ask for help through a dedicated contact form

### Exam history
You can access your exam score history through the "Zobacz wszystkie" button located where the 5 latest scores are displayed. Your scores are displayed in a paginated table.
Sort the scores by the date of their submission and the percentage score. Filter the scores by the exam's qualification and the percentage score (higher and/or lower than a specified value).
You can select rows on the current page and choose to delete them.

### Hardest questions page
A subpage accessible only to signed in users, which displays top 50 questions deemed by the web app's userbase to be the most difficult. It works by scanning the hard question collections of all users every 24hrs, and showing most frequently occuring questions (along with the number of collection's in which a certain question is located in).

## 🔜 Planned features

- Summaries about each answer to a question clarifying why it's either right or wrong (AI generated and human verified)

## 🧰 The stack

- Framework - Next.js 14
- Language - TypeScript
- ORM, Serverless Postgres, File storage and Auth - Supabase
- Deployments - Vercel
- Bot protection - HCaptcha
- Styling - TailwindCSS
- Components - custom + modified shadcn/ui
- Linting and formatting - Biome

## 👷‍♂️ Contributing

Suggest new features, report bugs etc. through [the dedicated contact form](https://teoriainformatyk.pl/contact) or [create a new issue](https://github.com/maciejkrol18/teoriainformatyk/issues)
