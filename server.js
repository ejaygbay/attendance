const http = require("http");
const fs = require("fs");
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

    /** MEMBERS TABLE
     * 
     * Create a table called 'members'
     * The 'members' table should have four columns:
     *     1. 'id' should have the following: 'INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT',
     *     2. 'member_name' should have datatype of VARCHAR(50),
     *     3. 'group_id' should have the following: 'INTEGER NOT NULL' and
     *     4. 'date_created' should have datatype of 'DATETIME'
     */

    /** ATTENDANCE TABLE
     * 
     * Create a table called 'attendance
     * The 'attendance' table should have four columns:
     *     1. 'id' should have the following: 'INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT',
     *     2. 'group_id' should have the following: 'INTEGER NOT NULL',
     *     3. 'member_id' should have the following: 'INTEGER NOT NULL' and
     *     4. 'date_created' should have datatype of 'DATETIME'
     */

    console.log("TABLES not created. Remove me after creating all of the tables")
}

const server = http.createServer((req, res) => {
    let url = req.url;
    let method = req.method;

    if(url === '/' && method === 'GET'){
        addMenuToPage("./groups.html", 'home', data => res.end(data));
    
    } else if(url === '/groups' && method === 'GET'){
        addMenuToPage("./groups.html", 'groups', data => res.end(data));
    
    } else if(url === '/group/create' && method === 'GET'){
        addMenuToPage("./new-group.html", 'create_group', data => res.end(data));
    
    } else if(url === '/member/create' && method === 'GET'){
        addMenuToPage("./new-member.html", 'create_member', data => res.end(data));
    
    } else if(url === '/attendance' && method === 'GET'){
        addMenuToPage("./past-attendance.html", 'attendance', data => res.end(data));
    
    } else if(url === '/attendance/individual' && method === 'GET'){
        addMenuToPage("./individual-attendance.html", 'individual_attendance', data => res.end(data));
    
    } else if(url === '/attendance/create' && method === 'GET'){
        addMenuToPage("./new-attendance.html", 'new_attendance', data => res.end(data));
    
    } else if(url === '/group/create' && method === 'POST'){
        // TODO 2
        // Store the data in the groups table
    
    } else if(url === '/attendance/create' && method === 'POST'){
        // TODO 11
        // Store the data in the attendance table
    
    } else if(url === '/member/create' && method === 'POST'){
        // TODO 7
        // Store the data in the members table
    
    } else if(url === '/data/groups' && method === 'GET'){
        // TODO 4
        // Get stored data from the groups table
    
    } else if(url === '/data/members' && method === 'GET'){
        // TODO 9
        // Get stored data from the members table
    
    } else if(url === '/data/attendance' && method === 'GET'){
        // TODO 13
        // Get stored data from the attendance table
    
    } else if(url === '/data/attendance/individual' && method === 'POST'){
        // TODO 16
        // Get stored data from the attendance table
    
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