CREATE DATABASE pinwheel;

-- \c pinwheel - connect to database then proceed
-- \d - display relations

--
-- accounts
--
CREATE TABLE IF NOT EXISTS accounts
(
   id text NOT NULL,
   user_id text NOT NULL,
   type text NOT NULL,
   provider text NOT NULL,
   provider_account_id text NOT NULL,
   refresh_token text,
   access_token text,
   expires_at integer,
   token_type text,
   scope text,
   id_token text,
   session_state text,
   CONSTRAINT accounts_pkey PRIMARY KEY (id),
   CONSTRAINT accounts_user_id_fkey FOREIGN KEY (user_id)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE CASCADE
)


--
-- sessions
--
CREATE TABLE IF NOT EXISTS sessions
(
   id text NOT NULL,
   session_token text NOT NULL,
   user_id text NOT NULL,
   expires timestamp(3) without time zone NOT NULL,
   CONSTRAINT sessions_pkey PRIMARY KEY (id),
   CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE CASCADE
)

--
-- users
--
CREATE TABLE IF NOT EXISTS users
(
   id text NOT NULL,
   name text,
   email text,
   email_verified timestamp(3) without time zone,
   image text,
   CONSTRAINT users_pkey PRIMARY KEY (id)
)


--
-- tokens
--
CREATE TABLE IF NOT EXISTS tokens
(
   identifier text NOT NULL,
   token text NOT NULL,
   expires timestamp(3) without time zone NOT NULL
)