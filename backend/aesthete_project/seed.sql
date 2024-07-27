-- Truncate tables
TRUNCATE TABLE reviews, projects, media_files, users, portfolios CASCADE;

-- Insert users
INSERT INTO users (username, email, password, name, phone, location, image_url)
VALUES 
    ('JDemp23', 'john.dempsey@example.com', 'Demp123456!', 'John Dempsey', '123-456-7890', 'New York, NY', 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1721948868~exp=1721952468~hmac=439c95e1937e5942ce3913d9751eaa98a425eb83c9a90de6bd792e81f5dbe04a&w=1800'),
    ('Smithkay12', 'kayla.smith@example.com', 'Smith23456!', 'Kayla Smith', '987-654-3210', 'Los Angeles, CA', 'https://example.com/kayla.jpg'),
    ('RoseLil45', 'lily.rose@example.com', 'osor345345!', 'Lily Rose', '345-678-9876', 'Chicago, IL', 'https://example.com/lily.jpg');

-- Insert portfolios
INSERT INTO portfolios (user_id, title, description, url, photo, uploaded_at)
SELECT id, 'John Dempsey Portfolio', 
'New York City, a vibrant metropolis brimming with life, offers an unparalleled blend of excitement and sophistication. The bustling streets of Manhattan are alive with the rhythmic pulse of city life, where the iconic skyline towers majestically against the horizon. Central Park provides a serene escape amidst the urban hustle, while Times Square dazzles with its neon lights and energetic atmosphere. From the historic charm of Brooklyn to the cultural richness of Queens, NYC presents a tapestry of diverse experiences waiting to be explored. Whether you’re strolling along the High Line or savoring a slice of authentic New York pizza, the city’s essence is captured in every moment. The spirit of innovation and creativity thrives here, making New York City a dynamic destination for adventure and discovery.', 
'https://www.wix.com/lp-en/website-builder?utm_source=affiliate&utm_source=affiliate&utm_medium=paid_referral&utm_campaign=af_top10bestwebsitehosting.com&experiment_id=cake_167364302^91', 
'https://essential-addons.com/wp-content/uploads/2021/05/Blog-Banner-1280x720-1.jpg', 
CURRENT_TIMESTAMP
FROM users
WHERE username = 'JDemp23';

INSERT INTO portfolios (user_id, title, description, url, photo, uploaded_at)
SELECT id, 'Kayla Smith Portfolio', 
'Los Angeles, the city of dreams and endless sunshine, is renowned for its glitz and glamour. From the iconic Hollywood Sign overlooking the cityscape to the golden beaches of Santa Monica, LA embodies a blend of entertainment and natural beauty. The bustling avenues of Hollywood are lined with legendary theaters and star-studded landmarks, while the vibrant arts scene thrives in the Downtown cultural districts. Venice Beach offers a laid-back atmosphere with its eclectic boardwalk and artistic murals, while Griffith Park provides sweeping views and outdoor adventures.', 
'https://www.canva.com/create/portfolios/', 
'https://www.adobe.com/express/learn/blog/media_1a4723eb0c857716ca15b1ce012eb9128028b49a8.png?width=2000&format=webply&optimize=medium', 
CURRENT_TIMESTAMP
FROM users
WHERE username = 'Smithkay12';

INSERT INTO portfolios (user_id, title, description, url, photo, uploaded_at)
SELECT id, 'Lily Rose Portfolio', 
'Chicago, a city known for its architectural marvels and deep-dish pizza, is a vibrant hub of culture and history. The impressive skyline, highlighted by landmarks such as the Willis Tower, showcases the city’s innovative spirit. Millennium Park offers a blend of art and nature with its iconic Cloud Gate sculpture and beautiful gardens. The historic neighborhoods of Chicago, from the lively streets of Wicker Park to the cultural richness of Pilsen, each tell a unique story. Navy Pier provides a waterfront escape with its attractions and scenic views, while the world-class museums and theaters enrich the city’s cultural landscape. Chicago’s culinary scene, renowned for its diverse offerings, and its passionate sports culture, make it a dynamic destination where tradition meets modernity.', 
'https://portfolio.adobe.com/', 
'https://templatesjungle.com/wp-content/uploads/edd/2022/01/plantly-plant-store-figma-template-cover.jpg', 
CURRENT_TIMESTAMP
FROM users
WHERE username = 'RoseLil45';

-- Insert projects
INSERT INTO projects (user_id, name, start_date, end_date, inspiration, description)
SELECT id, 'Project A', '2023-01-01', '2023-06-30', 'https://www.artmonarchs.co.za/wp-content/uploads/2023/08/art-inspiration-1024x682.jpg', 'Description of Project A'
FROM users
WHERE username = 'JDemp23';

INSERT INTO projects (user_id, name, start_date, end_date, inspiration, description)
SELECT id, 'Project B', '2023-07-01', '2023-12-31', 'https://static.boredpanda.com/blog/wp-content/uploads/2021/03/This-instagram-account-is-dedicated-to-show-parallels-between-fashion-and-nature-and-its-hard-not-to-fall-in-love-with-it-60506bbb4b618__700.jpg', 'Description of Project B'
FROM users
WHERE username = 'Smithkay12';

INSERT INTO projects (user_id, name, start_date, end_date, inspiration, description)
SELECT id, 'Project C', '2024-07-01', '2024-10-29', 'http://aturningpoint.com/wp-content/uploads/2013/04/crop-piano-sunset-500x264.jpg', 'Description of Project C'
FROM users
WHERE username = 'RoseLil45';

-- Insert reviews
INSERT INTO reviews (user_id, name, review_text, recommend, date)
SELECT id, 'Reviewer 1', 'This is review 1.', TRUE, CURRENT_DATE
FROM users
WHERE username = 'JDemp23';

INSERT INTO reviews (user_id, name, review_text, recommend, date)
SELECT id, 'Reviewer 2', 'This is review 2.', FALSE, CURRENT_DATE
FROM users
WHERE username = 'Smithkay12';

INSERT INTO reviews (user_id, name, review_text, recommend, date)
SELECT id, 'Reviewer 3', 'This is review 3.', TRUE, CURRENT_DATE
FROM users
WHERE username = 'RoseLil45';

-- Insert media files
INSERT INTO media_files (user_id, file, uploaded_at)
SELECT id, 'path/to/file1.jpg', CURRENT_TIMESTAMP
FROM users
WHERE username = 'JDemp23';

INSERT INTO media_files (user_id, file, uploaded_at)
SELECT id, 'path/to/file2.jpg', CURRENT_TIMESTAMP
FROM users
WHERE username = 'Smithkay12';

INSERT INTO media_files (user_id, file, uploaded_at)
SELECT id, 'path/to/file3.jpg', CURRENT_TIMESTAMP
FROM users
WHERE username = 'RoseLil45';



