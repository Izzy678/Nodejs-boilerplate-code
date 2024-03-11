import { CreationOptional, InferAttributes, InferCreationAttributes, UUIDV4 } from "sequelize";

import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from "../../config/database.config";


export class User extends Model
<
InferAttributes<User>,
InferCreationAttributes<User>
>
 {
  declare id: CreationOptional<string>; // this is ok! The 'declare' keyword ensures this field will not be emitted by TypeScript
  declare firstName:string;
  declare lastName:string;
  declare userName:string
  declare email:string
  declare password:string
}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: DataTypes.STRING,
    unique:true,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  userName:{
   type:DataTypes.STRING,
   unique:true,
   allowNull:false
  },
  email:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  }
}
, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name
  freezeTableName:true //does not a "s" to the table on postgres
});

User.sync({alter:true});
// the defined model is the class itself
