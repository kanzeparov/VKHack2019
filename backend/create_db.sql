DROP DATABASE hackdb;
DROP ROLE hackuser;
CREATE DATABASE hackdb;
CREATE USER hackuser WITH PASSWORD '123456';
GRANT ALL PRIVILEGES ON DATABASE hackdb TO hackuser;