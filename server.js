const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const {URL} = require("url");
const sqlite3 = require("sqlite3").verbose()
let db = new sqlite3.Database('./attendance');

/** TODO Zero(0):
 * 
 * THIS SHOULD BE DONE BEFORE ANY OTHER TODO
 * 
 * Create your tables in code and not in the terminal.
 * When creating your tables, use this command "CREATE TABLE IF NOT EXISTS table_name..."
 *     instead of "CREATE TABLE table_name..."
 * 
 * See the queries.sql file for examples in creating and inserting into a table and
 *     how to use "id" and current date in SQL.
 */
function createTables(){
    /** GROUPS TABLE
     * 
     * Create a table called 'groups'
     * The 'groups' table should have three columns:
     *     1. 'id' should have the following: INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     *     2. 'group_name' should have datatype of VARCHAR(30), and
     *     3. 'date_created' should have datatype of 'DATETIME'
     * 
     * Note: When inserting data into the date column, use this function datetime('now') as the value
     * 
     * Follow these links for more understanding on how to use date in sqlite's db.
     *     1. https://www.tutorialrepublic.com/sql-tutorial/sql-create-table-statement.php
     *     2. https://www.sqlitetutorial.net/sqlite-date/
     */

    db.run(`CREATE TABLE IF NOT EXISTS groups(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, group_name VARCHAR(30), date_created DATETIME);
    `, (err, result) => {
        !err ? console.log("Groups table created.") : console.log("Groups table not created.")
    })

    /** MEMBERS TABLE
     * 
     * Create a table called 'members'
     * The 'members' table should have four columns:
     *     1. 'id' should have the following: 'INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT',
     *     2. 'member_name' should have datatype of VARCHAR(50),
     *     3. 'group_id' should have the following: 'INTEGER NOT NULL' and
     *     4. 'date_created' should have datatype of 'DATETIME'
     */
    db.run(`CREATE TABLE IF NOT EXISTS members(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, member_name VARCHAR(30), group_id INTEGER NOT NULL, date_created DATETIME);
    `, (err, result) => {
        !err ? console.log("Members table created.") : console.log("Members table not created.")
    })

    /** ATTENDANCE TABLE
     * 
     * Create a table called 'attendance
     * The 'attendance' table should have four columns:
     *     1. 'id' should have the following: 'INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT',
     *     2. 'group_id' should have the following: 'INTEGER NOT NULL',
     *     3. 'member_id' should have the following: 'INTEGER NOT NULL' and
     *     4. 'date_created' should have datatype of 'DATETIME'
     */
    db.run(`CREATE TABLE IF NOT EXISTS attendance(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, group_id INTEGER NOT NULL, member_id INTEGER NOT NULL, date_created DATETIME);
    `, (err, result) => {
        !err ? console.log("Attendance table created.") : console.log("Attendance table not created.")
    })
}

const server = http.createServer((req, res) => {
    let url = new URL(req.url, "http://localhost:3000");
    let endpoint = url.pathname;
    let method = req.method;

    if(endpoint === '/' && method === 'GET'){
        addMenuToPage("./groups.html", 'home', data => res.end(data));
    
    } else if(endpoint === '/groups' && method === 'GET'){
        addMenuToPage("./groups.html", 'groups', data => res.end(data));
    
    } else if(endpoint === '/group/create' && method === 'GET'){
        addMenuToPage("./new-group.html", 'create_group', data => res.end(data));
    
    } else if(endpoint === '/member/create' && method === 'GET'){
        addMenuToPage("./new-member.html", 'create_member', data => res.end(data));
    
    } else if(endpoint === '/attendance' && method === 'GET'){
        addMenuToPage("./past-attendance.html", 'attendance', data => res.end(data));
    
    } else if(endpoint === '/attendance/individual' && method === 'GET'){
        addMenuToPage("./individual-attendance.html", 'individual_attendance', data => res.end(data));
    
    } else if(endpoint === '/attendance/create' && method === 'GET'){
        addMenuToPage("./new-attendance.html", 'new_attendance', data => res.end(data));
    
    } else if(endpoint === '/group/create' && method === 'POST'){
        // TODO 2
        // Store the data in the groups table
        req.on("data", (data) => {
            let result = JSON.parse(data);
            db.run(`INSERT INTO groups("group_name", "date_created") VALUES(?, datetime('now'));`, result.group_name, (err, result) => {
                !err ? res.end(JSON.stringify({status: 0, msg: "group created"})) : res.end(JSON.stringify({status: 1, msg: "group not created"}))
            })
        })
    
    } else if(endpoint === '/attendance/create' && method === 'POST'){
        // TODO 11
        // Store the data in the attendance table
        req.on("data", (data) => {
            let result = JSON.parse(data);
            result.members_present.forEach((ele, index) => {
                db.run(`INSERT INTO attendance(group_id, member_id, date_created) VALUES(?, ?, datetime('now'));`, result.group_id, ele);
            })
            res.end(JSON.stringify({status: 0, msg: "attendance created"}));
        })
    
    } else if(endpoint === '/member/create' && method === 'POST'){
        // TODO 7
        // Store the data in the members table
        req.on("data", (data) => {
            let result = JSON.parse(data);
            db.run(`INSERT INTO members(member_name, group_id, date_created) VALUES(?, ?, datetime('now'));`, result.member, result.group_name, (err, result) => {
                !err ? res.end(JSON.stringify({status: 0, msg: "member created"})) : res.end(JSON.stringify({status: 1, msg: "member not created"}))
            })
        })    
    } else if(endpoint === '/data/groups' && method === 'GET'){
        // TODO 4
        // Get stored data from the groups table
        db.all(`SELECT * FROM groups`, (err, data) => {
            res.end(JSON.stringify(data))
        })
    
    } else if(endpoint === '/data/members' && method === 'GET'){
        // TODO 9
        // Get stored data from the members table
        let group_id = url.searchParams.get('id');
        
        db.all(`SELECT id, member_name FROM members WHERE group_id = ?`, group_id, (err, data) => {
            res.end(JSON.stringify(data))
        })
    
    } else if(endpoint === '/data/attendance' && method === 'GET'){
        // TODO 13
        // Get stored data from the attendance table
        let group_id = url.searchParams.get('id');
        
        db.all(`SELECT member_name, attendance.date_created FROM attendance INNER JOIN members ON members.id = attendance.member_id WHERE attendance.group_id = ?`, group_id, (err, data) => {
            res.end(JSON.stringify(data));
        })
    
    } else if(endpoint === '/data/attendance/individual' && method === 'GET'){
        // TODO 16
        // Get stored data from the attendance table
        let group_id = url.searchParams.get('group_id');
        let member_id = url.searchParams.get('member_id');
        
        db.all(`SELECT member_name, attendance.date_created FROM attendance INNER JOIN members ON members.id = attendance.member_id WHERE attendance.group_id = ? AND attendance.member_id = ?`, group_id, member_id, (err, data) => {
            res.end(JSON.stringify(data));
        })

    } else {
        res.end("404")
    
    }
})

function addMenuToPage(file, page, callback){
    getHeader(page, (menu) => {
        readFromFile(file, page_data => callback(menu + page_data))
    })
}

function getHeader(page, callback){
    readFromFile("./menu.html", data => {
        let style = `<style>.${page}{ color: black}</style>`
        callback(data + style)
    })
}

function readFromFile(file, callback){
    fs.readFile(file, "utf8", (err, data) => callback(data))
}

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
    createTables();
})