const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

const minMax = {
  min_height: 10,
  max_height: 150,
  min_weight: 1,
  max_weight: 120,
  min_life_span: 1,
  max_life_span: 30
}
const mustBeBetween = (attribute, value, min, max) => {
  if(value && (value < min || value > max)) throw new Error(`${attribute} must be between ${min} and ${max}`);
}

const toPascalCase = (str) => {
  if(/^[\p{L}\d]+$/iu.test(str)) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str.replace(
    /([\p{L}\d])([\p{L}\d]*)/giu,
    (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
  ).replace(/[^\p{L}\d]/giu, ' ');
}

//TODO: separar las validaciones en constantes
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Breed', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue('name', toPascalCase(value));
      },
      validate: {
        notNull: {
          msg: `Name can't be empty`
        },
        is: {
          args: /^[a-zA-Z\s]+$/i,
          msg: 'Name must contain only characters'
        },
        len: {
          args: [3, 50],
          msg: 'Name must have 3 to 50 characters'
        }
      }
    },
    min_height: {
      type: DataTypes.FLOAT(4),
      allowNull: false,
      validate: {
        notNull: {
          msg: `Min Height can't be empty`
        },
        isFloat: {
          msg: 'Min Height must be a number'
        },
        between(value) {
          mustBeBetween('Min Height', value, minMax.min_height, minMax.max_height);
        }
      }
    },
    max_height: {
      type: DataTypes.FLOAT(4),
      allowNull: false,
      validate: {
        notNull: {
          msg: `Max Height can't be empty`
        },
        isFloat: {
          msg: 'Max Height must be a number'
        },
        between(value) {
          mustBeBetween('Max Height', value, minMax.min_height, minMax.max_height);
        }
      }
    },
    min_weight: {
      type: DataTypes.FLOAT(4),
      allowNull: false,
      validate: {
        notNull: {
          msg: `Min Weight can't be empty`
        },
        isFloat: {
          msg: 'Min Weight must be a number'
        },
        between(value) {
          mustBeBetween('Min Weight', value, minMax.min_weight, minMax.max_weight);
        }
      }
    },
    max_weight: {
      type: DataTypes.FLOAT(4),
      allowNull: false,
      validate: {
        notNull: {
          msg: `Max Weight can't be empty`
        },
        isFloat: {
          msg: 'Max Weight must be a number'
        },
        between(value) {
          mustBeBetween('Max Weight', value, minMax.min_weight, minMax.max_weight);
        }
      }
    },
    min_life_span: {
      type: DataTypes.SMALLINT,
      validate: {
        isInt: {
          msg: 'Min Life Span must be an integer'
        },
        between(value) {
          mustBeBetween('Life Span', value, minMax.min_life_span, minMax.max_life_span);
        }
      }
    },
    max_life_span: {
      type: DataTypes.SMALLINT,
      validate: {
        isInt: {
          msg: 'Max Life Span must be an integer'
        },
        between(value) {
          mustBeBetween('Life Span', value, minMax.min_life_span, minMax.max_life_span);
        }
      }
    }
  }, {
    timestamps: false,
    validate: {
      checkMinMax() {
        if(this.min_height >= this.max_height) throw new Error(`Max Height must be greater than Min Height`);
        if(this.min_weight >= this.max_weight) throw new Error(`Max Weight must be greater than Min Weight`);
        if(this.min_life_span && this.max_life_span && this.min_life_span >= this.max_life_span) throw new Error(`Max Life Span must be greater than Min Life Span`);
      }
    }
  });
};
