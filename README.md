# My Portfolio (Full-Stack)

A modern personal portfolio website with a working contact form. Messages are saved to a PostgreSQL database and can be read from a protected admin page.

Built by **Phat Ren**, a Full-Stack Web Developer student at Build Bright University, as a real project to learn and practice the full stack: interface, API and database.

## Features

**Frontend**

- Multi-page site with React Router: Home, About, Projects, Contact, Admin and a 404 page
- Dark and light theme, remembered in the browser
- Animated hero: letter-by-letter name animation, animated developer character, typewriter roles and a scrolling tech marquee
- About page with count-up statistics, grouped skills and a timeline
- Projects page with tag filters generated automatically from the data
- Scroll-reveal animations and a responsive layout for phones, tablets and desktops
- Navbar that turns blurry on scroll, with a scroll progress bar and an animated mobile menu
- Download CV button
- Accessibility: labels, keyboard-friendly menu, and animations are disabled for users who prefer reduced motion

**Backend**

- REST API built with Express and Sequelize
- Contact form saved to PostgreSQL
- Validation on both client and server
- Rate limiting on the contact endpoint
- Admin endpoint protected by a secret key
- Security basics: Helmet, CORS limited to the client, environment variables for all secrets

## Tech Stack

| Part | Technologies |
|---|---|
| Client | React, Vite, Tailwind CSS v4, React Router, Axios |
| Server | Node.js, Express, Sequelize, PostgreSQL, Helmet, CORS, express-rate-limit |
| Tooling | Git, npm, concurrently, nodemon |

## Project Structure

```
my-portfolio-fullstack/
├── client/                      # React frontend
│   ├── public/                  # cv.pdf, me.jpg, favicon.svg, project screenshots
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # ThemeToggle, DevCharacter, Reveal, Counter, TypeWriter
│   │   │   └── layout/          # Navbar, Footer, Layout
│   │   ├── data/                # about.js, home.js, projects.js, contact.js
│   │   ├── hooks/               # useReveal.js
│   │   ├── pages/               # Home, About, Projects, Contact, Admin, NotFound
│   │   ├── services/            # api.js, contactService.js, adminService.js
│   │   ├── styles/              # index.css (Tailwind and animations)
│   │   ├── App.jsx              # Routes
│   │   └── main.jsx             # Entry point
│   ├── .env.example
│   └── package.json
├── server/                      # Express backend
│   ├── src/
│   │   ├── config/              # Database connection
│   │   ├── controllers/         # contactController.js
│   │   ├── middlewares/         # adminAuth.js
│   │   ├── models/              # Message.js
│   │   ├── routes/              # healthRoutes.js, contactRoutes.js
│   │   └── app.js               # Express app and middleware
│   ├── server.js                # Starts the server
│   ├── .env.example
│   └── package.json
├── .gitignore
├── package.json                 # Runs client and server together
└── README.md
```

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer
- [PostgreSQL](https://www.postgresql.org/) running locally

## Getting Started

### 1. Clone the project

```bash
git clone https://github.com/phatrenn-dev-junior/my-portfolio-fullstack.git
cd my-portfolio-fullstack
```

### 2. Create the database

Create an empty PostgreSQL database named `my_portfolio` (with pgAdmin, or with `psql`):

```sql
CREATE DATABASE my_portfolio;
```

The `Messages` table is created automatically the first time the server starts.

### 3. Install dependencies

```bash
npm install
npm run install:all
```

### 4. Set up the environment files

Copy each example file and fill in your own values.

**Windows (PowerShell)**

```powershell
Copy-Item server\.env.example server\.env
Copy-Item client\.env.example client\.env
```

**macOS / Linux**

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Then edit the files:

`server/.env`

```
PORT=5000
CLIENT_URL=http://localhost:5173
DB_HOST=localhost
DB_PORT=5432
DB_NAME=my_portfolio
DB_USER=postgres
DB_PASSWORD=your_database_password
ADMIN_KEY=your_long_random_secret
```

`client/.env`

```
VITE_API_URL=http://localhost:5000/api
```

Generate a strong admin key with:

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
```

> Never commit `.env` files. They are already listed in `.gitignore`.

### 5. Run the project

```bash
npm run dev
```

- Client: <http://localhost:5173>
- Server health check: <http://localhost:5000/api/health>

## Scripts

Run from the project root:

| Command | What it does |
|---|---|
| `npm run dev` | Starts the server and the client together |
| `npm run install:all` | Installs dependencies in `server/` and `client/` |

Run inside `client/`:

| Command | What it does |
|---|---|
| `npm run dev` | Starts the Vite dev server |
| `npm run build` | Creates a production build in `client/dist` |
| `npm run preview` | Previews the production build |

Run inside `server/`:

| Command | What it does |
|---|---|
| `npm run dev` | Starts the server with nodemon (auto-restart) |
| `npm start` | Starts the server with Node |

## API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/health` | Check that the server is running | Public |
| POST | `/contact` | Save a contact form message | Public, rate limited |
| GET | `/contact` | List saved messages (newest first) | Admin key required |

### POST `/contact`

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello, I would like to talk about a role."
}
```

Rules: `name` is required, `email` must be valid, `message` must be 10 to 1000 characters. The endpoint allows 10 requests per 15 minutes for each IP address.

| Status | Meaning |
|---|---|
| 201 | Message saved |
| 400 | Invalid data (the response lists the errors) |
| 429 | Too many requests |

### GET `/contact`

Send the admin key in the `x-admin-key` header. The optional `limit` query (default 50, maximum 100) controls how many messages are returned.

```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/contact -Headers @{ 'x-admin-key' = 'YOUR_KEY' }
```

| Status | Meaning |
|---|---|
| 200 | List of messages |
| 401 | Missing or wrong key |

## Admin Page

Open <http://localhost:5173/admin>, type your `ADMIN_KEY` and click **View Messages**. The key is kept only in memory (it is not stored in the browser), so you need to enter it again after refreshing the page. There is intentionally no link to this page in the navigation.

## Customizing the Content

All the text and links live in `client/src/data/`, so you do not need to touch the components:

| File | Controls |
|---|---|
| `about.js` | Name, role, photo, bio, statistics, skills, timeline, "open to work" badge |
| `home.js` | Typewriter roles, intro text, technology marquee |
| `projects.js` | Project cards (title, description, image, tags, links, featured flag) |
| `contact.js` | Email, location, availability text, social links |

Other things to replace with your own:

- `client/public/cv.pdf` for the Download CV button
- `client/public/me.jpg` for your photo (then set `photo: '/me.jpg'` in `about.js`)
- `client/public/projects/` for project screenshots
- Links set to `#` are hidden automatically until you replace them with real URLs

## Security Notes

- Secrets live only in `.env` files, which are ignored by Git
- CORS only allows the URL set in `CLIENT_URL`
- `helmet` adds secure HTTP headers
- The contact form is validated on the server as well as in the browser
- Sequelize uses parameterized queries, which protects against SQL injection
- The admin key is compared in constant time
- When you deploy, use HTTPS so the admin key is never sent as plain text

## Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `Failed to resolve import ...` | A file is missing or in the wrong folder. Check its name and path |
| `EADDRINUSE ... 5000` | Another server is already using port 5000. Stop it or change `PORT` |
| `password authentication failed` | Wrong `DB_PASSWORD` in `server/.env` |
| `database "my_portfolio" does not exist` | Create the database (step 2) |
| `ECONNREFUSED` to the database | PostgreSQL is not running. Start the PostgreSQL service |
| `blocked by CORS policy` | `CLIENT_URL` in `server/.env` must match the client URL exactly. Restart the server |
| Client cannot reach the API | Check `VITE_API_URL` in `client/.env` and restart Vite (it reads `.env` only on start) |
| Admin page says "Wrong admin key" | The key must match `ADMIN_KEY` in `server/.env`. Restart the server after changing it |

## Deployment Notes

The client and server are separate apps and can be hosted separately:

- **Client:** run `npm run build` in `client/` and host the `dist` folder on a static host. Set `VITE_API_URL` to your public API URL before building.
- **Server:** host the Node app and set the same environment variables as in `server/.env`. Use a hosted PostgreSQL database and set `CLIENT_URL` to your public client URL.
- Use HTTPS for both.

## Roadmap

- [ ] Delete button for messages on the admin page
- [ ] Login with accounts instead of an admin key
- [ ] Khmer / English language switch
- [ ] Project detail pages
- [ ] Deploy online

## Author

**Phat Ren** · Full-Stack Web Developer

- GitHub: [phatrenn-dev-junior](https://github.com/phatrenn-dev-junior)
- Telegram: [@p_ren](https://t.me/p_ren)
- Phnom Penh, Cambodia