import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, serverTimestamp, query, where, orderBy, limit } from 'firebase/firestore';
import type { Product, Category, Order, Lead } from './definitions';
import { db } from '@/firebase/config';

// Note: db is the Firestore instance. This setup assumes db is initialized.

// --- Products ---
export async function getProducts() {
    const productsCol = collection(db, 'products');
    const productSnapshot = await getDocs(productsCol);
    const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    return productList;
}

export async function getProductById(id: string) {
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
        return { id: productSnap.id, ...productSnap.data() } as Product;
    }
    return undefined;
}

export async function addProduct(productData: Omit<Product, 'id'>) {
    const productsCol = collection(db, 'products');
    const docRef = await addDoc(productsCol, {
        ...productData,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
}

export async function updateProduct(id: string, productData: Partial<Product>) {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, productData);
}

export async function deleteProduct(id: string) {
    const productRef = doc(db, 'products', id);
    await deleteDoc(productRef);
}

// --- Categories ---
export async function getCategories() {
    const categoriesCol = collection(db, 'categories');
    const categorySnapshot = await getDocs(categoriesCol);
    const categoryList = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
    return categoryList;
}

export async function getCategoryBySlug(slug: string) {
    const q = query(collection(db, "categories"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as Category;
    }
    return undefined;
}

export async function addCategory(categoryData: Omit<Category, 'id' | 'slug' | 'imageUrl' | 'imageHint'>) {
    const slug = categoryData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const categoriesCol = collection(db, 'categories');
    const docRef = await addDoc(categoriesCol, { 
        ...categoryData, 
        slug,
        imageUrl: `https://picsum.photos/seed/${slug}/400/400`,
        imageHint: categoryData.name.toLowerCase(),
        createdAt: serverTimestamp() 
    });
    return docRef.id;
}

export async function updateCategory(id: string, categoryData: Partial<Category>) {
    const categoryRef = doc(db, 'categories', id);
    const slug = categoryData.name?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    await updateDoc(categoryRef, {
        ...categoryData,
        ...(slug && { slug })
    });
}

export async function deleteCategory(id: string) {
    const categoryRef = doc(db, 'categories', id);
    await deleteDoc(categoryRef);
}


// --- Orders ---
export async function getOrders() {
    const ordersCol = collection(db, 'orders');
    const q = query(ordersCol, orderBy('createdAt', 'desc'));
    const orderSnapshot = await getDocs(q);
    const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    return orderList;
}

export async function getRecentOrders(count: number = 5) {
    const ordersCol = collection(db, 'orders');
    const q = query(ordersCol, orderBy('createdAt', 'desc'), limit(count));
    const orderSnapshot = await getDocs(q);
    return orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
}


export async function getOrderById(id: string) {
    const orderRef = doc(db, 'orders', id);
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
        return { id: orderSnap.id, ...orderSnap.data() } as Order;
    }
    return undefined;
}

export async function addOrder(orderData: Omit<Order, 'id' | 'createdAt'>) {
    const ordersCol = collection(db, 'orders');
    const docRef = await addDoc(ordersCol, {
        ...orderData,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
}

export async function updateOrderStatus(id: string, status: Order['status']) {
    const orderRef = doc(db, 'orders', id);
    await updateDoc(orderRef, { status });
}

// --- Leads ---
export async function addLead(leadData: Omit<Lead, 'id' | 'dateCreated'>) {
    const leadsCol = collection(db, 'leads');
    const docRef = await addDoc(leadsCol, {
        ...leadData,
        dateCreated: serverTimestamp(),
    });
    return docRef.id;
}
