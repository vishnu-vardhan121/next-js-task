import { db } from "@/config/firebase";
import { collection, addDoc, doc } from "firebase/firestore";

const addSubCollectionDoc = async (
  parentCollection,
  docId,
  subCollection,
  data
) => {
  try {
    // Reference to the subcollection under the existing document
    const subCollectionRef = collection(
      doc(db, parentCollection, docId),
      subCollection
    );

    // Add a new document inside the subcollection
    const docRef = await addDoc(subCollectionRef, data);
    console.log(`Document added with ID: ${docRef.id}`);

    return docRef.id;
  } catch (err) {
    console.error("Error adding subcollection document: ", err);
    return { error: "Error adding subcollection document" };
  }
};

export default addSubCollectionDoc;
