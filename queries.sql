CREATE TABLE IF NOT EXISTS groups(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, group_name VARCHAR(30), date_created DATETIME);

INSERT INTO groups("group_name", "date_created") VALUES("Group 1", datetime('now'));

SELECT * FROM groups;

SELECT member_name, attendance.date_created FROM attendance INNER JOIN members ON members.id = attendance.member_id;

SELECT users.id, name, fruit_name FROM users INNER JOIN fruits ON fruits.id = users.fruit_id WHERE show = 1;
SELECT member_name, attendance.date_created FROM attendance INNER JOIN members ON members.id = attendance.member_id WHERE attendance.group_id = ?