-- ============================================================================
-- PostgreSQL one-time setup for To-Do API
-- Run these commands as the "postgres" superuser in psql
-- ============================================================================

-- 1. Create an application user (role) with login privileges
CREATE USER todo_user WITH PASSWORD 'todo_pass';

-- 2. Create the application database owned by that user
-- (OWNER means "todo_user" will be the default privileged role)
CREATE DATABASE todo_db OWNER todo_user;

-- 3. (Optional, but explicit) Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE todo_db TO todo_user;

-- ============================================================================
-- Verification (from terminal, outside SQL file):
--   psql "postgres://todo_user:todo_pass@localhost:5432/todo_db" -c "SELECT 1;"
-- ============================================================================
