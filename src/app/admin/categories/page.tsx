'use client';
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { getCategories } from "@/lib/data";
import { Loader2, MoreHorizontal, PlusCircle, Trash, Wand2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useFormState, useFormStatus } from 'react-dom';
import { addCategoryAction, deleteCategoryAction, suggestCategoriesAction } from "@/lib/admin-actions";
import { useEffect, useRef, useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

function AddCategoryForm() {
    const [state, formAction] = useFormState(addCategoryAction, { message: null });
    const { pending } = useFormStatus();
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    
    useEffect(() => {
        if (state.message === 'success') {
            toast({ title: 'Category added successfully!' });
            formRef.current?.reset();
        } else if (state.message) {
            toast({ title: 'Error', description: state.message, variant: 'destructive' });
        }
    }, [state, toast]);

    return (
        <form action={formAction} ref={formRef} className="space-y-2">
            <Label htmlFor="cat-name">Category Name</Label>
            <Input id="cat-name" name="name" placeholder="e.g. Home Office" disabled={pending} />
            <Button type="submit" className="w-full" disabled={pending}>
                {pending ? <Loader2 className="animate-spin" /> : <PlusCircle />}
                Add Category
            </Button>
        </form>
    )
}

export default function CategoriesPage() {
    const categories = getCategories();
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [suggestionState, suggestionAction] = useFormState(suggestCategoriesAction, { message: null, suggestions: [] });
    const { pending: suggestionsPending } = useFormStatus();
    const suggestionFormRef = useRef<HTMLFormElement>(null);

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
                                {categories.map(cat => (
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
                        <AddCategoryForm />
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
        </div>
    );
}
