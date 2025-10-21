'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect, useState, useTransition, useMemo } from 'react';

import { addProductAction, generateDescriptionAction } from '@/lib/admin-actions';
import { getCategories } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2 } from "lucide-react";
import type { Category } from '@/lib/definitions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  keywords: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  stock: z.coerce.number().int().min(0, 'Stock must be a non-negative integer'),
  imageUrl: z.string().url('Please enter a valid image URL'),
  galleryImageUrls: z.string().optional(),
  videoUrl: z.string().url().optional().or(z.literal('')),
  brochureUrl: z.string().url().optional().or(z.literal('')),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function NewProductForm() {
    const categories = useMemo(() => getCategories(), []);
    const { toast } = useToast();
    const [isGenerating, startDescriptionGeneration] = useTransition();

    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: { imageUrl: 'https://picsum.photos/seed/newprod/400/400' }
    });

    const [formState, formAction] = useActionState(addProductAction, { message: null, errors: {} });

    const productTitle = watch('name');
    const keywords = watch('keywords');

    const handleGenerateDescription = async () => {
        const formData = new FormData();
        formData.append('title', productTitle || '');
        formData.append('keywords', keywords || '');
        
        startDescriptionGeneration(async () => {
            const result = await generateDescriptionAction(null, formData);
            if(result.description) {
                setValue('description', result.description, { shouldValidate: true });
                toast({ title: "Description generated successfully!" });
            } else {
                toast({ title: "Error", description: result.message, variant: "destructive" });
            }
        });
    };

    useEffect(() => {
        if (formState?.message && formState.message !== 'success') {
            toast({
                title: "Error adding product",
                description: formState.message,
                variant: "destructive"
            });
        }
    }, [formState, toast]);

    const SubmitButton = () => {
        const { pending } = useFormStatus();
        return (
            <Button type="submit" size="lg" className="w-full" disabled={pending}>
                {pending ? <Loader2 className="animate-spin" /> : "Save Product"}
            </Button>
        );
    };

    return (
        <form action={formAction} className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                        <CardDescription>Enter the name, description, and keywords for your product.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" placeholder="e.g. Modern Velvet Sofa" {...register('name')} />
                            {errors.name && <p className="text-sm font-medium text-destructive">{errors.name.message}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="keywords">Keywords</Label>
                            <Input id="keywords" placeholder="e.g. sofa, velvet, modern, living room" {...register('keywords')} />
                            <p className="text-xs text-muted-foreground">Comma-separated keywords for AI generation.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <div className="relative">
                                <Textarea id="description" placeholder="A compelling description of your product." rows={6} {...register('description')} />
                                <Button type="button" size="sm" variant="outline" className="absolute bottom-2 right-2 flex items-center gap-2" onClick={handleGenerateDescription} disabled={isGenerating}>
                                    {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 />}
                                    {isGenerating ? "Generating..." : "Generate with AI"}
                                </Button>
                            </div>
                            {errors.description && <p className="text-sm font-medium text-destructive">{errors.description.message}</p>}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Pricing & Stock</CardTitle>
                    </CardHeader>
                     <CardContent className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (in ₹)</Label>
                            <Input id="price" type="number" placeholder="0.00" step="0.01" {...register('price')} />
                            {errors.price && <p className="text-sm font-medium text-destructive">{errors.price.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input id="stock" type="number" placeholder="0" {...register('stock')} />
                            {errors.stock && <p className="text-sm font-medium text-destructive">{errors.stock.message}</p>}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Category & Media</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label>Product Category</Label>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories?.map(cat => (
                                                <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.category && <p className="text-sm font-medium text-destructive">{errors.category.message}</p>}
                         </div>
                         <div className="space-y-2">
                            <Label htmlFor="imageUrl">Main Image URL</Label>
                            <Input id="imageUrl" placeholder="https://example.com/image.png" {...register('imageUrl')} />
                            {errors.imageUrl && <p className="text-sm font-medium text-destructive">{errors.imageUrl.message}</p>}
                         </div>
                         <div className="space-y-2">
                            <Label htmlFor="galleryImageUrls">Gallery Image URLs</Label>
                            <Textarea id="galleryImageUrls" placeholder="e.g. https://.../img1.png, https://.../img2.png" {...register('galleryImageUrls')} />
                            <p className="text-xs text-muted-foreground">Comma-separated URLs.</p>
                         </div>
                         <div className="space-y-2">
                            <Label htmlFor="videoUrl">Video URL</Label>
                            <Input id="videoUrl" placeholder="https://youtube.com/watch?v=..." {...register('videoUrl')} />
                            {errors.videoUrl && <p className="text-sm font-medium text-destructive">{errors.videoUrl.message}</p>}
                         </div>
                          <div className="space-y-2">
                            <Label htmlFor="brochureUrl">Brochure URL</Label>
                            <Input id="brochureUrl" placeholder="https://example.com/brochure.pdf" {...register('brochureUrl')} />
                            {errors.brochureUrl && <p className="text-sm font-medium text-destructive">{errors.brochureUrl.message}</p>}
                         </div>
                    </CardContent>
                </Card>
                 <SubmitButton />
            </div>
        </form>
    );
}
