CREATE TABLE IF NOT EXISTS groups(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, group_name VARCHAR(30), date_created DATETIME);

INSERT INTO groups("group_name", "date_created") VALUES("Group 1", datetime('now'));

SELECT * FROM groups;