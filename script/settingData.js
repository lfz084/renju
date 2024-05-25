
if (window.top.settingData) {
	window.settingData = window.top.settingData;
}
else (function(global, factory) {
    (global = global || self, factory(global));
}(this, (async function(exports) {
	try{
	'use strict';
	const DATABASS_NAME = "lfz084";
	const STORE_NAME = "settings";
	const STORES = [
		{
			name: "settings",
			key: "key",
			indexNames: ["index01","index02","index03","index04","index05","index06","index07","index08","index09","index10"]
		},
		{
			name: "puzzle",
			key: "key",
			indexNames: ["title", "progress", "json", "time", "index01", "index02", "index03", "index04", "index05", "index06", "index07", "index08", "index09", "index"]
		}
	];
	
	await IndexedDB.open(DATABASS_NAME, 2, (db) => {
		try {
			for (let i = 0; i < STORES.length; i++) {
				const STORE_NAME = STORES[i]["name"];
				const KEY = STORES[i]["key"];
				const INDEXNAMES = STORES[i]["indexNames"];
				if (!db.objectStoreNames.contains(STORE_NAME)) {
					const objectStore = db.createObjectStore(STORE_NAME, {
						keyPath: KEY,
						autoIncrement: false
					});
					INDEXNAMES.map(indexName => {
						objectStore.createIndex(indexName, indexName, { unique: false, multiEntry: false });
					})
					console.log(`indexNames: ${[...objectStore.indexNames]}`)
				}
				/*
				if (db.objectStoreNames.contains(STORE_NAME)) {
					db.deleteObjectStore(STORE_NAME);
				}
				*/
			}
		} catch (e) { console.error(e.stack)}
	})
	
	async function getDataByKey(key) {
		try{
			const data = await IndexedDB.getDataByKey(this.STORE_NAME, key);
			return data;
		}catch(e){console.error(e.stack)}
	}
	
	async function getDataByIndex(indexName, value) {
		try {
			const data = await IndexedDB.getDataByIndex(this.STORE_NAME, indexName, value);
			return data;
		} catch (e) { console.error(e.stack) }
	}
	
	async function addData(obj) {
		try {
			return await IndexedDB.addData(this.STORE_NAME, obj)
		} catch (e) { console.error(e.stack) }
	}
	
	async function putData(obj) {
		try {
			return await IndexedDB.putData(this.STORE_NAME, obj)
		} catch (e) { console.error(e.stack) }
	}
	
	async function deleteDataByKey(key) {
		try {
			return await IndexedDB.deleteDataByKey(this.STORE_NAME, key)
		} catch (e) { console.error(e.stack) }
	}
	
	async function deleteDataByIndex(indexName, value) {
		try {
			const data = await this.getDataByIndex(indexName, value);
			return await this.deleteDataByKey(data.key);
		} catch (e) { console.error(e.stack) }
	}
	
	async function openCursorByKey(callback) {
		try {
			return await IndexedDB.openCursorByKey(this.STORE_NAME, undefined, callback)
		} catch (e) { console.error(e.stack) }
	}
	
	async function openCursorByIndex(indexName, callback) {
		try {
			return await IndexedDB.openCursorByIndex(this.STORE_NAME, indexName, undefined, callback)
		} catch (e) { console.error(e.stack) }
	}
	
	exports.settingData = {
		STORES,
		STORE_NAME,
		addData,
		putData,
		getDataByKey,
		getDataByIndex,
		deleteDataByKey,
		deleteDataByIndex,
		openCursorByKey,
		openCursorByIndex
	}
	
	}catch(e){console.error(e.stack)}
})))