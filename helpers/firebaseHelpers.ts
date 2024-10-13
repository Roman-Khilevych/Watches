import { doc, collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { CategoryModel } from '@/models/category';
import { ProductModel } from '@/models/product';

export async function getProducts(): Promise<ProductModel[]> {
  try {
    const productsCollectionRef = collection(db, 'products');
    const snapshot = await getDocs(productsCollectionRef);
    const products = snapshot.docs.map((doc) => ({ ...doc.data() })) as ProductModel[];
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getCategories(): Promise<CategoryModel[]> {
  try {
    const categoriesCollectionRef = collection(db, 'categories');
    const snapshot = await getDocs(categoriesCollectionRef);
    const categories = snapshot.docs.map((doc) => ({ ...doc.data() })) as CategoryModel[];
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getConfig() {
  try {
    const configDocRef = doc(db, 'config', 'global');
    const configSnapshot = await getDoc(configDocRef);

    if (configSnapshot.exists()) {
      return configSnapshot.data();
    } else {
      console.error('No config found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching config:', error);
    return null;
  }
}
