import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";

const addFireStoreDoc = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log(docRef.id);

    if (docRef.id) {
      return docRef.id;
    }
  } catch (err) {
    console.error("Error adding document: ", err);
    return { error: "Error adding document" };
  }
};

export default addFireStoreDoc;
