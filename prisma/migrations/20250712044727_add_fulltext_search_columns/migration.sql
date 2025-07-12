-- Create the search_vector column
ALTER TABLE "question" ADD COLUMN "search_vector" TSVECTOR;

-- Create the function for updating the search_vector
CREATE OR REPLACE FUNCTION update_question_search_vector() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector = to_tsvector('english', NEW.title || ' ' || NEW.description);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger to automatically update search_vector on insert/update
CREATE TRIGGER update_question_search_vector_trigger
BEFORE INSERT OR UPDATE ON "question"
FOR EACH ROW EXECUTE FUNCTION update_question_search_vector();

-- Populate search_vector for any existing data (if any)
UPDATE "question" SET search_vector = to_tsvector('english', title || ' ' || description);

-- Create the GIN index for fast full-text queries
CREATE INDEX question_search_vector_idx ON "question" USING GIN (search_vector);