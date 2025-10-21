
'use client';
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Loader2, MoreHorizontal, PlusCircle, Trash, Wand2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useFormStatus } from 'react-dom';
import { addCategoryAction, deleteCategoryAction, suggestCategoriesAction, updateCategoryAction } from "@/lib/admin-actions";
import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Category } from "@/lib/definitions";
import { getCategories } from "@/lib/mongodb-services";

function AddCategoryForm({ onCategoryAdded }: { onCategoryAdded: () => void }) {
    const [state, formAction] = useActionState(addCategoryAction, { message: null });
    const { pending } = useFormStatus();
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    
    useEffect(() => {
        if (state.message === 'success') {
            toast({ title: 'Category added successfully!' });
            formRef.current?.reset();
            onCategoryAdded();
        } else if (state.message) {
            toast({ title: 'Error', description: state.message, variant: 'destructive' });
        }
    }, [state, toast, onCategoryAdded]);

    return (
        <form action={formAction} ref={formRef} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="cat-name">Category Name</Label>
                <Input id="cat-name" name="name" placeholder="e.g. Home Office" disabled={pending} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="cat-slug">Slug</Label>
                <Input id="cat-slug" name="slug" placeholder="e.g. home-office" disabled={pending} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="cat-imageUrl">Image URL</Label>
                <Input id="cat-imageUrl" name="imageUrl" placeholder="https://example.com/image.png" disabled={pending} />
            </div>
            <Button type="submit" className="w-full" disabled={pending}>
                {pending ? <Loader2 className="animate-spin" /> : <PlusCircle />}
                Add Category
            </Button>
        </form>
    )
}

function EditCategoryDialog({ category, onOpenChange, open, onCategoryUpdated }: { category: Category; open: boolean; onOpenChange: (open: boolean) => void; onCategoryUpdated: () => void; }) {
    const { toast } = useToast();
    const [state, formAction] = useActionState(updateCategoryAction, { message: null });
     const { pending } = useFormStatus();

    useEffect(() => {
        if (state.message === 'success') {
            toast({ title: 'Category updated!' });
            onCategoryUpdated();
            onOpenChange(false);
        } else if (state.message) {
            toast({ title: 'Error', description: state.message, variant: 'destructive' });
        }
    }, [state, toast, onOpenChange, onCategoryUpdated]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription>
                        Make changes to your category here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="id" value={category.id} />
                    <div className="space-y-2">
                        <Label htmlFor="edit-cat-name">Category Name</Label>
                        <Input id="edit-cat-name" name="name" defaultValue={category.name} disabled={pending}/>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={pending}>Cancel</Button>
                        <Button type="submit" disabled={pending}>
                             {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [suggestionState, suggestionAction] = useActionState(suggestCategoriesAction, { message: null, suggestions: [] });
    const { pending: suggestionsPending } = useFormStatus();
    const suggestionFormRef = useRef<HTMLFormElement>(null);

    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const refreshCategories = async () => {
        setIsLoading(true);
        try {
            const data = await getCategories();
            setCategories(data.map(d => ({...d, id: d._id})));
        } catch (e) {
            console.error('Failed to load categories:', e);
            setCategories([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshCategories();
    }, []);

    useEffect(() => {
        if (suggestionState.message === 'success') {
            setSuggestions(suggestionState.suggestions);
            toast({ title: 'Suggestions loaded!' });
            suggestionFormRef.current?.reset();
        } else if (suggestionState.message) {
            toast({ title: 'Error', description: suggestionState.message, variant: 'destructive' });
        }
    }, [suggestionState, toast]);

    const handleDelete = (id: string) => {
        startTransition(async () => {
            const result = await deleteCategoryAction(id);
            if (result?.message) {
                 toast({ title: 'Error', description: result.message, variant: 'destructive' });
            } else {
                 toast({ title: 'Category deleted' });
                 refreshCategories();
            }
        });
    }

    const handleSuggestionClick = (suggestion: string) => {
        const input = document.getElementById('cat-name') as HTMLInputElement;
        if (input) {
            input.value = suggestion;
            input.focus();
        }
        setSuggestions([]);
    }

    return (
        <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
                <PageHeader title="Categories" description="Manage your product categories." />
                 <Card>
                    <CardHeader>
                        <CardTitle>Category List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow><TableCell colSpan={3} className="text-center">Loading...</TableCell></TableRow>
                                ) : categories?.map(cat => (
                                    <TableRow key={cat.id}>
                                        <TableCell className="font-medium">{cat.name}</TableCell>
                                        <TableCell>{cat.slug}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost" disabled={isPending}>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                     <DropdownMenuItem onSelect={() => setEditingCategory(cat)}>
                                                        <Edit className="mr-2 h-4 w-4"/> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => handleDelete(cat.id)} className="text-destructive">
                                                        <Trash className="mr-2 h-4 w-4"/> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-1 space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Add New Category</CardTitle>
                        <CardDescription>
                            Create a new category.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AddCategoryForm onCategoryAdded={refreshCategories} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>AI Category Suggestions</CardTitle>
                        <CardDescription>Get suggestions from AI based on a product idea.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={suggestionAction} ref={suggestionFormRef} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="productTitle">Product Title</Label>
                                <Input id="productTitle" name="productTitle" placeholder="e.g. Ergonomic Office Chair" disabled={suggestionsPending}/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="productDescription">Product Description</Label>
                                <Textarea id="productDescription" name="productDescription" placeholder="e.g. A comfortable chair for long work hours..." rows={3} disabled={suggestionsPending}/>
                            </div>
                            <Button variant="outline" type="submit" className="w-full" disabled={suggestionsPending}>
                                {suggestionsPending ? <Loader2 className="animate-spin" /> : <Wand2 />}
                                Suggest Categories
                            </Button>
                        </form>
                        {suggestions.length > 0 && (
                            <div className="mt-4 space-y-2">
                                <h4 className="font-medium">Suggestions:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {suggestions.map((s, i) => (
                                        <Badge key={i} variant="secondary" className="cursor-pointer hover:bg-accent" onClick={() => handleSuggestionClick(s)}>{s}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            {editingCategory && (
                <EditCategoryDialog 
                    category={editingCategory} 
                    open={!!editingCategory} 
                    onOpenChange={(open) => !open && setEditingCategory(null)}
                    onCategoryUpdated={refreshCategories}
                />
            )}
        </div>
    );
}

    