const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
	const figurinhas = sequelize.define('figurinhas', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		selecao: {
			allowNull: false,
			type: DataTypes.STRING
		},
		anoEstreia: {
			allowNull: false,
			type: DataTypes.STRING
		},
		nome: {
			allowNull: false,
			type: DataTypes.STRING
		},
		timeAtual: {
			allowNull: false,
			type: DataTypes.STRING
		},
		dataNascimento: {
			allowNull: false,
			type: DataTypes.DATE
		},
		altura: {
			allowNull: false,
			type: DataTypes.FLOAT
		},
		peso: {
			allowNull: false,
			type: DataTypes.DECIMAL
		}
	});
	await figurinhas.sync();
};
