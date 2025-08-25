-- ============================================================================
-- PostgreSQL one-time setup for To-Do API
-- ============================================================================

-- 1. Create an application user 
CREATE USER todo_user WITH PASSWORD 'todo_pass';

-- 2. Create the application database
CREATE DATABASE todo_db OWNER todo_user;

-- 3. Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE todo_db TO todo_user;