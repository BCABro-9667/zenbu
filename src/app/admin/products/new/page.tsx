import { getCategories } from '@/lib/data';
import { PageHeader } from "@/components/admin/page-header";
import NewProductForm from './new-product-form';

export default async function NewProductPage() {
    const categories = getCategories();

    return (
        <div>
            <PageHeader title="Add New Product" description="Fill in the details to add a new product to your store." />
            <NewProductForm categories={categories} />
        </div>
    );
}
