import { sequelize } from "../../config/database.config";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize, UUIDV4 } from "sequelize";
import { User } from "../../users/model/user.model";

export class Session extends Model<
InferAttributes<Session>,
InferCreationAttributes<Session>
> {
    declare id:CreationOptional<string>
    declare user:string
    declare valid:CreationOptional<boolean>
    declare userAgent:string
}

Session.init(
  {
      user: {
          type: DataTypes.UUID,
          references: {
              model: User,
              key: "id",
          },
      },
      valid: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
      },
      userAgent: {
          type: DataTypes.STRING,
      },
      id: {
        type:DataTypes.UUID,
        defaultValue:UUIDV4(),
        primaryKey:true
      }
  },
  {
    sequelize,
    modelName:'session',
  }
);

Session.sync({alter:true});