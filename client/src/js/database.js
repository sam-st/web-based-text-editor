import { openDB } from "idb";

// Initialize the 'jate' database
const initializeDatabase = async () => {
  const dbName = "jate";
  const dbVersion = 1;

  const db = await openDB(dbName, dbVersion, {
    upgrade(database) {
      if (database.objectStoreNames.contains(dbName)) {
        console.log(`The '${dbName}' database already exists.`);
        return;
      }
      const objectStore = database.createObjectStore(dbName, { keyPath: "id", autoIncrement: true });
      console.log(`Created the '${dbName}' database with an auto-incrementing key.`);
    },
  });
};

// Add content to the 'jate' database
export const putDb = async (content) => {
  console.log("Putting text into the 'jate' database.");
  
  const dbName = "jate";
  const dbVersion = 1;

  const db = await openDB(dbName, dbVersion);
  const transaction = db.transaction(dbName, "readwrite");
  const objectStore = transaction.objectStore(dbName);

  const entry = { content };
  const request = objectStore.put(entry);

  const result = await request;

  console.log("Updated text entry has been saved to the 'jate' database! Result:", result);
};

// Retrieve content from the 'jate' database
export const getDb = async () => {
  console.log("Retrieving text entry from the 'jate' database.");
  
  const dbName = "jate";
  const dbVersion = 1;

  const db = await openDB(dbName, dbVersion);
  const transaction = db.transaction(dbName, "readonly");
  const objectStore = transaction.objectStore(dbName);

  const request = objectStore.get(1);
  const result = await request;

  if (result) {
    console.log("Retrieved text entry from the 'jate' database.");
    return result.content;
  } else {
    console.log("No text entry found in the 'jate' database.");
    return null;
  }
};

// Initialize the 'jate' database when the module is imported
initializeDatabase();
