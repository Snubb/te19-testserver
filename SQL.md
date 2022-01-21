# Anteckningar

https://github.com/jensnti/wsp1-mysql

sudo service mysql restart // startar om servern, kör när man startar wsl för den gör det inte automatiskt.

history | grep mysql // visar alla kommandot man kört med ett keyword(mysql).

mysql -u '[username]' -p
// Starta mysql
```sql
CREATE USER '[username]'@'localhost' IDENTIFIED BY '[password]';
// Skapa användare

GRANT ALL PRIVILEGES ON *.* TO '[username]'@'localhost'; 
// Gör en superuser av användaren

show databases;
// self explanatory

use '[database]'
// använd databas

show tables;
// Visa tabeller

SELECT * FROM '[table]'
// Visar information från en tabell

describe '[table]';
// Visa tabellen

create database '[name]';
// skapar database

ALTER TABLE '[table]' ADD(modify, drop) name VARCHAR (140) NOT NULL;
// Lägg till en grej i tabellen

INSERT INTO users (name) VALUES ('Oliver');
// eeeeeeeeehhhh
```