import { db } from "@/config/firebase";
import { doc, setDoc } from "firebase/firestore";

const setFireStoreDoc = async (collectionName, docId, data) => {
  try {
    await setDoc(doc(db, collectionName, docId), data, { merge: true });
    console.log(`Document ${docId} successfully written!`);

    return { success: true, id: docId };
  } catch (err) {
    console.error("Error setting document: ", err);
    return { error: "Error setting document" };
  }
};

export default setFireStoreDoc;
