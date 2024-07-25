CREATE DATABASE aesthete;
CREATE USER aestheteuser WITH PASSWORD 'aesthete';
GRANT ALL PRIVILEGES ON DATABASE aesthete TO aestheteuser;
ALTER DATABASE aesthete OWNER TO aestheteuser;