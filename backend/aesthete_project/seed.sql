TRUNCATE TABLE reviews, projects, users CASCADE;






-- Insert data into users table without specifying primary keys
INSERT INTO users (name, email, phone, location, image_url, portfolio)
VALUES ('John Dempsey', 'john.doe@example.com', '123-456-7890', 'New York, NY', 'https://example.com/profile.jpg', 'https://example.com/portfolio'),
       ('Kayla Smith', 'jane.smith@example.com', '987-654-3210', 'Los Angeles, CA', 'https://example.com/jane.jpg', 'https://example.com/jane-portfolio'),
       ('Lily Rose', 'lily.rose@example.com', '345-678-9876', 'Chicago, IL', 'https://example.com/lily.jpg', 'https://example.com/lily-portfolio');

-- Insert data into projects table, referencing users by name
INSERT INTO projects (user_id, name, start_date, end_date, inspiration, description)
SELECT id, 'Project A', '2023-01-01', '2023-06-30', 'https://example.com/inspiration.jpg', 'Description of Project A'
FROM users
WHERE name = 'John Dempsey';

INSERT INTO projects (user_id, name, start_date, end_date, inspiration, description)
SELECT id, 'Project B', '2023-07-01', '2023-12-31', 'https://example.com/inspiration2.jpg', 'Description of Project B'
FROM users
WHERE name = 'Kayla Smith';

INSERT INTO projects (user_id, name, start_date, end_date, inspiration, description)
SELECT id, 'Project C', '2024-07-01', '2023-10-29', 'https://example.com/inspiration3.jpg', 'Description of Project C'
FROM users
WHERE name = 'Lily Rose';

-- Insert data into reviews table, referencing users by name
INSERT INTO reviews (user_id, name, review_text, recommend, date)
SELECT id, 'Reviewer 1', 'This is review 1.', TRUE, CURRENT_DATE
FROM users
WHERE name = 'John Dempsey';  -- Corrected name from 'John Dympsey' to 'John Dempsey'

INSERT INTO reviews (user_id, name, review_text, recommend, date)
SELECT id, 'Reviewer 2', 'This is review 2.', FALSE, CURRENT_DATE
FROM users
WHERE name = 'Kayla Smith';

INSERT INTO reviews (user_id, name, review_text, recommend, date)
SELECT id, 'Reviewer 3', 'This is review 3.', TRUE, CURRENT_DATE
FROM users
WHERE name = 'Lily Rose';

