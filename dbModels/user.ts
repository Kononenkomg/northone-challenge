import { DataTypes, Model } from "../deps.ts";

export class User extends Model {
  static table = "users";

  static fields = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  //Model
  id!: string;
  name!: string;
}