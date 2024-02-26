/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const collection = new Collection({
			id: "96x2cpxtmxajwaq",
			created: "2024-02-26 13:43:07.068Z",
			updated: "2024-02-26 13:43:07.068Z",
			name: "reservations",
			type: "base",
			system: false,
			schema: [
				{
					system: false,
					id: "duo1gbcp",
					name: "room",
					type: "relation",
					required: true,
					presentable: true,
					unique: false,
					options: {
						collectionId: "55g26z42nz5d65e",
						cascadeDelete: false,
						minSelect: null,
						maxSelect: null,
						displayFields: null,
					},
				},
				{
					system: false,
					id: "n2y97rlv",
					name: "user",
					type: "relation",
					required: true,
					presentable: true,
					unique: false,
					options: {
						collectionId: "_pb_users_auth_",
						cascadeDelete: false,
						minSelect: null,
						maxSelect: null,
						displayFields: null,
					},
				},
				{
					system: false,
					id: "nmxkj9wm",
					name: "start",
					type: "date",
					required: true,
					presentable: true,
					unique: false,
					options: {
						min: "",
						max: "",
					},
				},
				{
					system: false,
					id: "obiw9vss",
					name: "end",
					type: "date",
					required: true,
					presentable: true,
					unique: false,
					options: {
						min: "",
						max: "",
					},
				},
			],
			indexes: [],
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
		const collection = dao.findCollectionByNameOrId("96x2cpxtmxajwaq");

		return dao.deleteCollection(collection);
	},
);
