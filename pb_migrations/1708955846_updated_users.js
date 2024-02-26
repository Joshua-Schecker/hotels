/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: "xl0aq5mj",
				name: "role",
				type: "select",
				required: false,
				presentable: false,
				unique: false,
				options: {
					maxSelect: 2,
					values: ["booker", "administrator"],
				},
			}),
		);

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

		// remove
		collection.schema.removeField("xl0aq5mj");

		return dao.saveCollection(collection);
	},
);
