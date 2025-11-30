-- SlideSMS Database Schema

-- Base audit columns (included in every table)
-- loaded_datetimeutc TIMESTAMP NOT NULL DEFAULT now()
-- loaded_source TEXT NOT NULL
-- loaded_by TEXT NULL

CREATE TABLE phones (
    country_code INT NOT NULL DEFAULT 1,
    phone INTEGER NOT NULL,
    loaded_datetimeutc TIMESTAMP NOT NULL DEFAULT now(),
    loaded_source TEXT NOT NULL,
    loaded_by TEXT NULL,
    UNIQUE (country_code, phone)
);

CREATE TABLE email (
    email TEXT NOT NULL,
    loaded_datetimeutc TIMESTAMP NOT NULL DEFAULT now(),
    loaded_source TEXT NOT NULL,
    loaded_by TEXT NULL,
    PRIMARY KEY (email)
);

CREATE TABLE organizations (
    org_id SERIAL PRIMARY KEY,
    loaded_datetimeutc TIMESTAMP NOT NULL DEFAULT now(),
    loaded_source TEXT NOT NULL,
    loaded_by TEXT NULL
);

CREATE TABLE persons (
    person_id SERIAL PRIMARY KEY,
    phone INTEGER,
    email TEXT,
    firstname TEXT,
    lastname TEXT,
    loaded_datetimeutc TIMESTAMP NOT NULL DEFAULT now(),
    loaded_source TEXT NOT NULL,
    loaded_by TEXT NULL,
    FOREIGN KEY (phone) REFERENCES phones(phone),
    FOREIGN KEY (email) REFERENCES email(email)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    person_id INT NOT NULL,
    org_id INT NOT NULL,
    loaded_datetimeutc TIMESTAMP NOT NULL DEFAULT now(),
    loaded_source TEXT NOT NULL,
    loaded_by TEXT NULL,
    FOREIGN KEY (person_id) REFERENCES persons(person_id),
    FOREIGN KEY (org_id) REFERENCES organizations(org_id)
);

CREATE TABLE optout_history (
    person_id INT NOT NULL,
    opt_out BOOLEAN NOT NULL,
    loaded_datetimeutc TIMESTAMP NOT NULL DEFAULT now(),
    loaded_source TEXT NOT NULL,
    loaded_by TEXT NULL,
    PRIMARY KEY (person_id),
    FOREIGN KEY (person_id) REFERENCES persons(person_id)
);

CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    message_raw TEXT,
    message_final TEXT,
    loaded_datetimeutc TIMESTAMP NOT NULL DEFAULT now(),
    loaded_source TEXT NOT NULL,
    loaded_by TEXT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE messages_queue (
    queue_id SERIAL PRIMARY KEY,
    message_id INT NOT NULL,
    phone INTEGER NOT NULL,
    scheduled_at_local TIMESTAMP,
    scheduled_at_utc TIMESTAMP,
    loaded_datetimeutc TIMESTAMP NOT NULL DEFAULT now(),
    loaded_source TEXT NOT NULL,
    loaded_by TEXT NULL,
    FOREIGN KEY (message_id) REFERENCES messages(message_id)
);

CREATE TABLE messages_sent (
    sent_id SERIAL PRIMARY KEY,
    message_id INT NOT NULL,
    loaded_datetimeutc TIMESTAMP NOT NULL DEFAULT now(),
    loaded_source TEXT NOT NULL,
    loaded_by TEXT NULL,
    FOREIGN KEY (message_id) REFERENCES messages(message_id)
);

CREATE TABLE messages_response (
    received_id SERIAL PRIMARY KEY,
    sent_id INT NOT NULL,
    received_type TEXT,
    error_message TEXT,
    loaded_datetimeutc TIMESTAMP NOT NULL DEFAULT now(),
    loaded_source TEXT NOT NULL,
    loaded_by TEXT NULL,
    FOREIGN KEY (sent_id) REFERENCES messages_sent(sent_id)
);

CREATE TABLE phones_score_history (
    phone INTEGER NOT NULL,
    score NUMERIC,
    model_version TEXT,
    loaded_datetimeutc TIMESTAMP NOT NULL DEFAULT now(),
    loaded_source TEXT NOT NULL,
    loaded_by TEXT NULL,
    PRIMARY KEY (phone)
);
