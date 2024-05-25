//if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["IndexedDB"] = "2024.23206";

if (window.top.IndexedDB) {
	window.IndexedDB = window.top.IndexedDB;
}
else (function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    
    const DEBUG_INDEXEDDB = false;
	
	function log(param, type = "log") {
		const print = console[type] || console.log;
		DEBUG_INDEXEDDB && window.DEBUG && (window.vConsole || window.parent.vConsole) && print(`indexedDB.js: ${ param}`);
	}
	
	//--------------------------------------------------------------------------------------
	

    const DEFAULT_OBJECTSTORE_INFO = {
        name: "objectStore",
        optionalParameters: {
            keyPath: "ID",
            autoIncrement: false
        },
        indexInfoList: [{
            indexName: "indexName",
            keyPath: "index",
            objectParameters: { unique: false, multiEntry: false }
        }]
    };

    function isPromise(obj) {
        return obj && "Promise" === (obj.constructor && obj.constructor.name)
    }
	/**
	 * 创建一个事务
	 * @storeName
	 * @mode			默认值 "readonly"
 	*/
    function getTransaction(storeName, mode = "readonly") {
        try {
            return this.database.transaction(storeName, mode);
        }
        catch (e) {
            console.error(e.message);
        }
    }
	/**
	 * 返回 store 对象
	 * @storeName
	 * @mode		 默认值 "readonly"
 	*/
    function getStore(storeName, mode = "readonly") {
    	try{
    		if (this.database && this.database.constructor.name == "IDBDatabase") {
            	let transaction = this.getTransaction(storeName, mode);
            	if (transaction && transaction.constructor.name == "IDBTransaction") {
                	return transaction.objectStore(storeName);
            	}
            	else console.error(`Error transaction is not IDBTransaction`)
        	}
        	else console.error(`Error this.database is not IDBDatabase`)
    	}catch(e){console.error(e.stack)}
    }
	/**
	 * 返回 index 对象
	 * @storeName
	 * @indexName
	 * @mode		默认值 "readonly"
 	*/
    function getIndex(storeName, indexName, mode = "readonly") {
        try{
        	let store = this.getStore(storeName, mode);
        	if (store && store.constructor.name == "IDBObjectStore") {
        		return store.index(indexName);
        	}
        	else console.error(`Error store is not IDBObjectStore`)
        }catch(e){console.error(e.stack)}
    }
	/**
	 * 返回 Promise
	 * resolve: 添加数据成功后返回true
	 * @store
	 * @data
	 * @key
 	*/
    async function add(store, data, key) { //add data
        return new Promise(resolve => {
            try {
                if (!store) { resolve(false); return };
                let request = store.add(data, key);
                request.onerror = function(event) {
                    console.error(`Error adding new data`);
                    resolve(false);
                };
                request.onsuccess = function(event) { resolve(true) };
            } catch (e) {
                console.error(e.stack);
                resolve(false);
            }
        })
    }
	/**
	 * 返回 Promise
	 * resolve: 覆盖数据成功返回 true
	 * @store
	 * @data
	 * @key
 	*/
    async function put(store, data, key) { //put data
        return new Promise(resolve => {
            try {
                if (!store) { resolve(false); return };
                let request = store.put(data, key);
                request.onerror = function(event) {
                    console.error(`Error putting new data`);
                    resolve(false);
                };
                request.onsuccess = function(event) { resolve(true) };
            } catch (e) {
                console.error(e.stack);
                resolve(false);
            }
        })
    }
	/**
	 * 返回 Promise
	 * reso1lve: 返回一个记录 || undefined
	 * @IDBobj
	 * @value
 	*/
    async function get(IDBobj, value) { //get data
        return new Promise(resolve => {
            try {
                if (!IDBobj) { resolve(); return };
                let request = IDBobj.get(value);
                request.onerror = function(event) {
                    console.error(`Error getting new data`);
                    resolve();
                };
                request.onsuccess = function(event) {
                    resolve(event.target.result);
                };
            } catch (e) {
                console.error(e.stack);
                resolve();
            }
        })
    }
	/**
	 * 返回 Promise
	 * reso1lve: 删除数据成功返回 true
	 * @store
	 * @key
 	*/
    async function del(store, key) { //delete data
        return new Promise(resolve => {
            try {
                if (!store) { resolve(false); return };
                let request = store.delete(key);
                request.onerror = function(event) {
                    console.error(`Error deleting new data`);
                    resolve(false);
                };
                request.onsuccess = function(event) { resolve(true) };
            } catch (e) {
                console.error(e.stack);
                resolve(false);
            }
        })
    }
	/**
	 * 返回 Promise
	 * resolve: 打开或创建 一个IDBDatabase
	 * @name
	 * @version
	 * @callback	添加或者删除 store
 	*/
    async function openDB(name, version = 1, callback = () => {}) {
    	this.database && this.close();
        return new Promise(resolve => {
            try {
                let request = exports.indexedDB.open(name, version);
                request.onerror = function(event) {
                    // Do something with request.errorCode!
                    console.error(`openDB : ${request.errorCode}`);
                    resolve();
                }.bind(this);
                request.onsuccess = function(event) {
                    // Do something with request.result!
                    this.database = event.target.result;
                    this.name = name;
                    this.version = version;
                    log(`openDB: "${name}" ${version}`);
                    log(`this.database: ${this.database}`)
                    resolve(this.database);
                }.bind(this);
                request.onupgradeneeded = function(event) {
                	this.database = event.target.result;
                    this.name = name;
                    this.version = version;
                    try{callback(event.target.result)}catch(e){console.error(e.stack)}
                    log(`onupgradeneeded name: "${name}", version: ${version}`);
                }.bind(this);
            } catch (e) {
                console.error(e.stack);
                resolve();
            }
        })
    }
	/**
	 * 返回 Promise
	 * resolve: idbIndex 记录个数
 	*/
    async function count(idbIndex, key) {
        return new Promise(resolve => {
            try {
                let countRequest = idbIndex.count(key);
                countRequest.onsuccess = () => {
                    resolve(countRequest.result);
                };
            } catch (e) { 
                console.error(e.stack); 
                resolve();
            }
        })
    }
	/**
	 * 关闭 database
 	*/
    function closeDB() {
        try {
            if (this.database) {
                this.database.close();
                log(`closeDB: "${this.name}"`);
                this.name = undefined;
                this.version = undefined;
                this.database = undefined;
            }
        } catch (e) { console.error(e.stack) }
    }
	/**
	 * 删除 database
 	*/
    function deleteDB() {
        try {
            let name = this.name;
            this.close();
            log(`deleteDB: "${name}"`);
            return exports.indexedDB.deleteDatabase(name);
        } catch (e) { console.error(e.stack) }
    }
	/**
	 * 清空 store
 	*/
    function clearStore(storeName) {
        try {
            let store = this.getStore(storeName, "readwrite");
            store.clear();
            return true;
        } catch (e) { console.error(e.stack); return false }
    }
	/**
	 * 新增一项记录,返回 Promise
	 * resolve: 成功 true， 失败 false
	 * @storeName		仓库名称
	 * @dataList		记录或者记录数组
	 * @key				保留参数
 	*/
    async function addData(storeName, dataList, key = undefined) {
        try {
            let store = this.getStore(storeName, "readwrite");
            if (!Array.isArray(dataList)) dataList = [dataList];
            for (let i = 0; i < dataList.length; i++) {
                if (false == await add(store, dataList[i]), key) {
                    return false;
                }
                log(`${IndexedDB.name} -> ${storeName} -> addData ${i+1}/${dataList.length}`)
            }
            return true;
        } catch (e) { console.error(e.stack); return false }
    }
	/**
	 * 覆盖一项记录,返回 Promise
	 * resolve: 成功 true， 失败 false
	 * @storeName		仓库名称
	 * @dataList		记录或者记录数组
	 * @key				保留参数
 	*/
    async function putData(storeName, dataList, key = undefined) {
        try {
            let store = this.getStore(storeName, "readwrite");
            if (!Array.isArray(dataList)) dataList = [dataList];
            for (let i = 0; i < dataList.length; i++) {
                if (false == await put(store, dataList[i], key)) {
                    return false;
                }
                log(`${IndexedDB.name} -> ${storeName} -> putData ${i+1}/${dataList.length}`)
            }
            return true;
        } catch (e) { console.error(e.stack); return false }
    }
    /**
     * 
     */
    async function openCursorByKey(storeName, mode = "readonly", callback = undefined) {
    	return new Promise((resolve) => {
    		try{
    			const objectStore = this.getStore(storeName, mode);
                log(`${IndexedDB.name} -> ${storeName} -> openCursorByKey`)
    			objectStore.openCursor().onsuccess = function(event) {
    				try{
    					const cursor = event.target.result;
    					if (cursor && "function" == typeof callback) {
    						callback(cursor);
    						cursor.continue();
    					}
    					else resolve(cursor)
    				}catch(e){console.error(e.stack); resolve()}
    			}
    		}catch(e){console.error(e.stack); resolve()}
    	})
    }
    /**
     * 
     */
    async function openCursorByIndex(storeName, indexName, mode = "readonly", callback = undefined) {
    	return new Promise((resolve) => {
    		try{
    			const objectStore = this.getIndex(storeName, indexName, mode);
    			log(`${IndexedDB.name} -> ${storeName} -> openCursorByIndex ${indexName}`)
    			objectStore.openCursor().onsuccess = function(event) {
    				try{
    					const cursor = event.target.result;
    					if (cursor && "function" == typeof callback) {
    						callback(cursor);
    						cursor.continue();
    					}
    					else resolve(cursor)
    				}catch(e){console.error(e.stack); resolve()}
    			}
    		}catch(e){console.error(e.stack); resolve()}
    	})
    }
	/**
	 * 返回 Promise
	 * resolve: 成功返回一个记录，失败返回 undefined
	 * @storeName
	 * @value		keyValue
 	*/
    async function getDataByKey(storeName, value) {
        try {
            let store = this.getStore(storeName, "readonly");
            return await get(store, value);
        } catch (e) { console.error(e.stack) }
    }
	/**
	 * 返回 Promise
	 * resolve: 成功返回一个记录，失败返回 undefined
	 * @storeName
	 * @indexName
	 * @value		indexValue
 	*/
    async function getDataByIndex(storeName, indexName, value) {
        try {
            let index = this.getIndex(storeName, indexName, "readonly");
            return await get(index, value);
        } catch (e) { console.error(e.stack) }
    }
	/**
	 * 删除一个记录，返回 Promise
	 * resolve: 成功 true 失败 false
	 * @storeName
	 * @value		keyValue
	*/
    async function deleteDataByKey(storeName, value) {
        try {
            let store = this.getStore(storeName, "readwrite");
            if (false == await del(store, value)) {
            	return false;
            }
            log(`${IndexedDB.name} -> ${storeName} -> deleteDataByKey ${value}`)
        } catch (e) { console.error(e.stack); return false }
    }
    /**
     * 删除一个记录，返回 Promise
     * resolve: 成功 true 失败 false
     * @storeName
     * @indexName
     * @value		indexValue
    */
    async function deleteDataByIndex(storeName, indexName, value) {
    	try {
     		const data = await this.getDataByIndex(storeName, indexName, value);
     		if (data) {
     			const store = this.getStore(storeName, "readwrite");
     			if (false == await del(store, data.id)) {
     				return false;
     			}
     			log(`${IndexedDB.name} -> ${storeName} -> deleteDataByIndex ${data.id}`)
     		}
    	} catch (e) { console.error(e.stack); return false }
    }

    let IndexedDB = {
        name: undefined,
        version: undefined,
        database: undefined,
        getTransaction,
        getStore,
        getIndex,
        open: openDB,
        close: closeDB,
        count,
        delete: deleteDB,
        clearStore,
        addData,
        putData,
        openCursorByKey,
        openCursorByIndex,
        getDataByKey,
        getDataByIndex,
        deleteDataByKey,
        deleteDataByIndex
    };

    exports.IndexedDB = IndexedDB;

    /*------------------- test code ------------------------*/
	/*
    async function test() {
    	let oldDatabass = IndexedDB.database ? {name:IndexedDB.name , version:IndexedDB.version} : undefined;
    	
    	let out = await IndexedDB.open("test", 1, (db) => {
        	try{
        	const objectStore = db.createObjectStore("testStore", {
        		keyPath: "id",
        		autoIncrement: false
        	});
        	console.log(`objectStore: ${objectStore}`)
        	objectStore.createIndex("age", "age", { unique: false, multiEntry: false });
        	objectStore.createIndex("name", "name", { unique: false, multiEntry: false });
        	console.log([...db.objectStoreNames])
        	if (db.objectStoreNames.contains("testStore")) {
            	//db.deleteObjectStore("testStore");
        	}
        	}catch(e){console.error(e.stack)}
        })
        console.log(`IndexedDB.open: ${out}`)
        
        out = await IndexedDB.addData("testStore", {
        	id: 1,
        	age: 18,
        	name: "red"
        })
        console.log(`IndexedDB.addData: ${out}`)
        out = await IndexedDB.addData("testStore", {
        	id: 2,
        	age: 19,
        	name: "red"
        })
        console.log(`IndexedDB.addData: ${out}`)
        out = await IndexedDB.putData("testStore", {
        	id: 1,
        	age: 20,
        	name: "blue"
        })
        console.log(`IndexedDB.putData: ${out}`)
        out = await IndexedDB.putData("testStore", {
        	id: 2,
        	age: 21,
        	name: "blue"
        })
        console.log(`IndexedDB.putData: ${out}`)
        
        out = await IndexedDB.getStore("testStore")
        console.log(`IndexedDB.getStore: ${out}`)
        
        out = await IndexedDB.getIndex("testStore", "age")
        console.log(`IndexedDB.getIndex: ${out}`)

        out = await IndexedDB.getDataByKey("testStore", 1)
        console.log(`IndexedDB.getDataByKey: ${JSON.stringify(out)}`)

        out = await IndexedDB.getDataByIndex("testStore", "age", 20)
        console.log(`IndexedDB.getDataByIndex: age -> ${JSON.stringify(out)}`)

        out = await IndexedDB.getDataByIndex("testStore", "name", "blue")
        console.log(`IndexedDB.getDataByIndex: name -> ${JSON.stringify(out)}`)
        
        out = await IndexedDB.count(await IndexedDB.getStore("testStore"));
        console.log(`IndexedDB.count: ${out}`)
        
        out = await IndexedDB.openCursorByKey("testStore", undefined, (cursor) => {
        	console.log(`cursor: ${JSON.stringify(cursor.value)}`)
        })
        console.log(`IndexedDB.openCursorByKey: ${out}`)
        
        await IndexedDB.deleteDataByIndex("testStore", "age", 20)
        
        out = await IndexedDB.openCursorByKey("testStore", undefined, (cursor) => {
        	console.log(`cursor: ${JSON.stringify(cursor.value)}`)
        })
        console.log(`IndexedDB.openCursorByKey: ${out}`)

        console.log(`testStore deleteDataByKey ${await IndexedDB.deleteDataByKey("testStore", 1001)}`)

        console.log(`testStore clearStore ${IndexedDB.clearStore("testStore")}`)

        console.log(IndexedDB.delete("testStore"))
        
        oldDatabass && IndexedDB.open(oldDatabass.name, oldDatabass.version)
    }

    IndexedDB.test = test;
    */
    /*
    self.IndexedDB = fullscreenUI.contentWindow.IndexedDB
    self.IndexedDB.test()
    */

})))
