import { db } from "@/config/firebase";
import { query } from "firebase/database";
import { collection, getDocs } from "firebase/firestore";

const getAllFireStoreDocs = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ ...doc.data() }));
  } catch (error) {
    console.error("Error fetching Firestore document:", error);
    return { error: "Error fetching Firestore document" };
  }
};

export default getAllFireStoreDocs;
