const fs = require('fs').promises;
const path = require('path');
const filename = 'users.json';
const initialUsers = [];
var file = path.resolve(filename);

const store = {
  async read() {
    try {
      await fs.access(file);
      const f = await fs.readFile(file);
      const f2 = JSON.parse(f);
      this.users = f2;
    } catch (error) {
      this.users = initialUsers;
      console.log('error on read..');
    }
    return this.users;
  },
  async save() {
    try {
      await fs.writeFile(filename, JSON.stringify(this.users));
    } catch (error) {
      console.log('error on save..');
    }
  },
  async getIndexById(id) {
    try {
      const users = await this.read();
      return users.findIndex((user) => user.id === +id);
    } catch (error) {
      console.log('error on getIndexById');
    }
  },
  async getNextUserId() {
    let maxId = 0;
    const users = await this.read();
    users.map((user) => {
      if (user.id > maxId) maxId = user.id;
    });
    return maxId + 1;
  },
  async isUserExist(data) {
    const users = await this.read();
    return users.find((user) => user.email == data);
  },
  async findUserById(data) {
    const users = await this.read();
    return users.find((user) => user.id == data);
  },
  async addLocation() {
    try {
      await fs.writeFile(filename, JSON.stringify(this.users));
    } catch (error) {
      console.log('error on save..');
    }
  },
  users: [],
};

module.exports = store;
