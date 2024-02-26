/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const collection = new Collection({
			id: "55g26z42nz5d65e",
			created: "2024-02-26 13:39:22.814Z",
			updated: "2024-02-26 13:39:22.814Z",
			name: "rooms",
			type: "base",
			system: false,
			schema: [
				{
					system: false,
					id: "njo6qlbp",
					name: "hotel",
					type: "relation",
					required: true,
					presentable: true,
					unique: false,
					options: {
						collectionId: "r21u7f6ii9h2hyc",
						cascadeDelete: false,
						minSelect: null,
						maxSelect: null,
						displayFields: null,
					},
				},
				{
					system: false,
					id: "mxkzk6gv",
					name: "number",
					type: "text",
					required: true,
					presentable: true,
					unique: false,
					options: {
						min: 1,
						max: null,
						pattern: "",
					},
				},
				{
					system: false,
					id: "encvq6n0",
					name: "type",
					type: "select",
					required: true,
					presentable: false,
					unique: false,
					options: {
						maxSelect: 1,
						values: ["single", "double", "suite"],
					},
				},
				{
					system: false,
					id: "2r22c4yu",
					name: "max_guests",
					type: "number",
					required: true,
					presentable: true,
					unique: false,
					options: {
						min: null,
						max: null,
						noDecimal: true,
					},
				},
				{
					system: false,
					id: "5piegwaw",
					name: "price",
					type: "number",
					required: false,
					presentable: false,
					unique: false,
					options: {
						min: null,
						max: null,
						noDecimal: false,
					},
				},
			],
			indexes: [
				"CREATE UNIQUE INDEX `idx_jnFDqDS` ON `rooms` (\n  `number`,\n  `hotel`\n)",
			],
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
		const collection = dao.findCollectionByNameOrId("55g26z42nz5d65e");

		return dao.deleteCollection(collection);
	},
);
