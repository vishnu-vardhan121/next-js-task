import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

const updateDocumentFields = async (collectionName, docId, newFields) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, newFields);
    console.log(`Fields updated in ${docId}`);
  } catch (error) {
    console.error("Error updating fields:", error);
  }
};

export default updateDocumentFields;
