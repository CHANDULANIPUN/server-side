const db = require('../config/db');
const User = require('../models/userModel');


class UserDao {
    static createUser(username, password, apiKey) {
        return new Promise((resolve, reject) => {
            if (!username || !password || !apiKey) {
                return reject(new Error('Invalid input: username, password, and apiKey are required'));
            }

            db.run(
                "INSERT INTO users (username, password, api_key) VALUES (?, ?, ?)",
                [username, password, apiKey],
                function (err) {
                    if (err) {
                        return reject(new Error(`Failed to create user: ${err.message}`));
                    }
                    resolve(this.lastID);
                }
            );
        });
    }
    static getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            if (!username) {
                return reject(new Error('Invalid input: username is required'));
            }

            db.get(
                "SELECT * FROM users WHERE username = ?",
                [username],
                (err, row) => {
                    if (err) {
                        // Log the error for internal tracking
                        console.error(`Database error: ${err.message}`);
                        return reject(new Error('Failed to fetch user by username'));
                    }
                    resolve(row || null); // Explicitly return `null` if no user is found
                }
            );
        });
    }


    static updateApiKey(username, newApiKey) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE users SET api_key = ? WHERE username = ?`;
            db.run(sql, [newApiKey, username], function (err) {
                if (err) {
                    // Log the error for debugging purposes
                    console.error(`Failed to update API key for user ${username}: ${err.message}`);
                    return reject(new Error(`Failed to update API key: ${err.message}`));
                }

                // Check if any rows were updated
                if (this.changes === 0) {
                    return reject(new Error(`No user found with username: ${username}`));
                }

                resolve(this.changes);
            });
        });
    }


    static revokeApiKey(username) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE users SET api_key = NULL WHERE username = ?`;
            db.run(sql, [username], function (err) {
                if (err) {
                    console.error(`Failed to revoke API key for user ${username}: ${err.message}`);
                    return reject(new Error(`Failed to revoke API key: ${err.message}`));
                }
                
                if (this.changes === 0) {
                    return reject(new Error(`No user found with username: ${username}`));
                }

                resolve(this.changes);
            });
        });
    }


    static updateApiKey(username, newApiKey) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE users SET api_key = ? WHERE username = ?`;
            console.log('Executing SQL:', sql);
            console.log('With values:', newApiKey, username);

            db.run(sql, [newApiKey, username], function (err) {
                if (err) {
                    console.error('Error updating API key:', err);
                    return reject(new Error(`Failed to update API key: ${err.message}`));
                }
                console.log('Rows updated:', this.changes);
                resolve(this.changes);
            });
        });
    }
}


module.exports = UserDao;