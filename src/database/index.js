import { Sequelize } from "sequelize";

import User from "../app/controllers/models/User.js";
import configDatabase from '../config/database.js';

const models = [User];

class Database {
    constructor() {
        this.init();
    }
    init() {
        this.connection = new Sequelize(configDatabase);
        models.map((model) => model.init(this.connection))
    }
}

export default Database();