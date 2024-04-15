import { createClient } from "@supabase/supabase-js";

// This is the client used to connect to the supabase database 

export const supabase = createClient(
  "https://ilwxjusuorzswybcyvjw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlsd3hqdXN1b3J6c3d5YmN5dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1ODgzMzUsImV4cCI6MjAyODE2NDMzNX0.kfJh2p23oSwQFUlCwmU3hxuB9CQJcGuXbNeojgn909M"
);
