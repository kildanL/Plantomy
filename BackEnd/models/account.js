'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        static associate(models) {}
    }
    Account.init({
        Hash: DataTypes.STRING,
        Login: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Account',
    });
    return Account;
};