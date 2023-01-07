# Steps to run the project accordly

You need to have a `mysql - database` installed locally.

And change in `.env` file current credentials with yours.

Run the two commands:

`CREATE TABLE moviess_table (
imdbID varchar(255) PRIMARY KEY,
title varchar(255),
year varchar(255),
type varchar(255)
);`

`CREATE TABLE posters_table (
imdbID varchar(255),
poster varchar(255),  
PRIMARY KEY (imdbID),
FOREIGN KEY (imdbID)
REFERENCES movies_table (imdbID)
ON DELETE CASCADE
);`

After that `npm install`

The API will run on `3010` port



