import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

const getFireStoreDoc = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id); // No need to await here
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // Return only the document data
    } else {
      return null; // Return null if document doesn't exist
    }
  } catch (err) {
    console.error("Error getting document: ", err);
    return { error: "Error getting document" };
  }
};

export default getFireStoreDoc;
