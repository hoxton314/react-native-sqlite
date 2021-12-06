import React, { Component } from 'react'
import { Text, View } from 'react-native'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("nazwisko_imie_grupa.db"); // proszę o taki schemat nazywania swojej bazy danych, zwłaszcza podczas testów na telefonach w pracowni

export class Database extends Component {
    static createTable() {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS budziki (id integer primary key not null, time text, state integer, mon integer, tue integer, wed integer, thu integer, fri integer, sat integer, sun integer);"
            );
        });
    }
    static add() {

        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO budziki (time, state, mon, tue, wed, thu, fri, sat, sun) values ('12:45', 1, 1, 1, 1, 0, 1, 1, 1)");
            },
        )
        console.log('added')
    }
    static getAll() {
        var query = "SELECT * FROM budziki";
        return new Promise((resolve, reject) => db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {
                console.log(JSON.stringify(results))
                resolve(JSON.stringify(results));
            }, function (tx, error) {
                reject(error);
            });
        }))
    }
    static remove() {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM budziki WHERE (id = 0);"
            );
        });

    }
    static removeAll() {

        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM budziki ;"
            );
        });
    }
    static dropTable() {
        db.transaction(tx => {
            tx.executeSql(
                "DROP TABLE budziki;"
            );
        });
    }
}

export default Database
