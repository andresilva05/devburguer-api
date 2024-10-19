import { Model, DataTypes } from 'sequelize'; // Use DataTypes para acessar os tipos de dados

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                password_hash: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                admin: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                tableName: 'users',
            },
        );
    }
}

export default User;
