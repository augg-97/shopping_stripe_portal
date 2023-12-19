-- This is an empty migration.
DROP INDEX IF EXISTS "User_email_key";
CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree ("email", "deletedAt");
