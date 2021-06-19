const fs = require("fs");
const path = require("path");



class Main {

    constructor() {
        this.todoList = this.List;
    }

    get List() {
        try {
            let tl = JSON.parse(fs.readFileSync(path.join(__dirname, "../todo_list.json")));
            return tl;
        } catch(error) {
            throw error;
        }
    }
    
    add(text, cb) {
        this.todoList.push({text});
        this.saveArray();
        cb();
    }

    remove(index, cb) {
        this.todoList.splice(index, 1);
        this.saveArray();
        cb();
    }

    saveArray() {
        try {
            fs.writeFileSync(path.join(__dirname, "../todo_list.json"), JSON.stringify(this.todoList));
        } catch(error) {
            throw error;
        }
    }

}

module.exports = Main;