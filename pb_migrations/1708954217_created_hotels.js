/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const collection = new Collection({
			id: "r21u7f6ii9h2hyc",
			created: "2024-02-26 13:30:17.624Z",
			updated: "2024-02-26 13:30:17.624Z",
			name: "hotels",
			type: "base",
			system: false,
			schema: [
				{
					system: false,
					id: "mxo7du7p",
					name: "name",
					type: "text",
					required: false,
					presentable: false,
					unique: false,
					options: {
						min: null,
						max: null,
						pattern: "",
					},
				},
			],
			indexes: ["CREATE UNIQUE INDEX `idx_wpnHE40` ON `hotels` (`name`)"],
			listRule: null,
			viewRule: null,
			createRule: null,
			updateRule: null,
			deleteRule: null,
			options: {},
		});

		return Dao(db).saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId("r21u7f6ii9h2hyc");

		return dao.deleteCollection(collection);
	},
);
