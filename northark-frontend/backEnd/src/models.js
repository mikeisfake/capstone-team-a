const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./db');


class Customers extends Model {

}

Customers.init ({
    name:{
        type: DataTypes.STRING,
    },
   
    email: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    }
},{
    sequelize, // We need to pass the connection instance
    modelName: 'Customers' // We need to choose the model name
});

class Accounts extends Model {

}

Accounts.init ({
    account_number: {
        type: DataTypes.STRING,
    },
    current_balance: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    available_credit: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    available_balance: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
},{
    sequelize, 
    modelName: 'Accounts' 
});

class Transactions extends Model {

}

Transactions.init ({
    amount: {
        type: DataTypes.FLOAT,
    },
},{
    sequelize, 
    modelName: 'Transactions' 
});

class TransactionTypes extends Model {

}

TransactionTypes.init ({
    description: {
        type: DataTypes.STRING
    }
},{
    sequelize, 
    modelName: 'TransactionTypes' 
});

class AccountTypes extends Model {

}

AccountTypes.init ({
    description: {
        type: DataTypes.STRING
    }
},{
    sequelize, 
    modelName: 'AccountTypes' 
});

Customers.hasMany(Accounts, {
    foreignKey: {
        allowNull: false
    }
});
Accounts.belongsTo(Customers);

Accounts.hasMany(Transactions, {
    foreignKey: {
        allowNull: false
    }
});
Transactions.belongsTo(Accounts);

TransactionTypes.hasMany(Transactions, {
    foreignKey: {
        allowNull: false
    }
});
Transactions.belongsTo(TransactionTypes);

AccountTypes.hasMany(Accounts, {
    foreignKey: {
        allowNull: false
    }
});
Accounts.belongsTo(AccountTypes);

sequelize.sync({alter:true});

module.exports = {Customers, Accounts, Transactions, TransactionTypes, AccountTypes};