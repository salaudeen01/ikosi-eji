/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2 } from "lucide-react";
import Layout from "@/components/layout/shell";
import UploadImageForm from "@/components/UploadFile";
import { Category, CreateCategoryPayload } from "../../../../type";
import { useUploadStore } from "@/store/useUploadStore";
import { useCreateCategory, useFetchCategories, usePatchCategory, useUpdateCategory } from "@/hooks/mutatiion/useCreateCategory";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Confirmation from "@/components/Confirmation";


const CategoryManager = () => {
  const { imageUrl, setImage } = useUploadStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { categories } = useCategoryStore(); // page, total, nextPage, prevPage, setSearch
  const { isLoading, isError } = useFetchCategories();

  const [form, setForm] = useState<CreateCategoryPayload>({
    name: "",
    slug: "",
    imageUrl:"",
    description: "",
    status: "",
    id: "",
  });

  const createCategoryMutation = useCreateCategory({
    onSuccessCallback: () =>{ 
      setDialogOpen(false);
      setForm({...form, name: '', slug: '', imageUrl: '', status:'', description:''});
      setImage('')
    },
  });

  const updateCategoryMutation = useUpdateCategory({
    onSuccessCallback: () =>{ 
      setDialogOpen(false);
      setForm({...form, name: '', slug: '', imageUrl: '', status:'', description:''});
      setImage('')
    },
  });

  const patchCategoryMutation = usePatchCategory({
    onSuccessCallback: () =>{ 
      setOpen(false);
      setForm({...form, name: '', slug: '', imageUrl: '', status:'', description:''});
      setImage('')
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    const payload: CreateCategoryPayload ={...form, imageUrl: imageUrl || ''}
    e.preventDefault();
    createCategoryMutation.mutate(payload);
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    const payload: CreateCategoryPayload = {...form, imageUrl: imageUrl || ''}
    e.preventDefault();
    updateCategoryMutation.mutate(payload);
  };

  const handleSubmitDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    patchCategoryMutation.mutate(form);
  };

  const handleEdit = (category: Category) => {
    setForm({...form, name: category.name, slug: category.slug, imageUrl: category.imageUrl, description: category.description, id: category.id});
    setDialogOpen(true)
    setImage(category.imageUrl)
  };
  const onClose =()=>{
    setDialogOpen(false);
    setForm({...form, name: '', slug: '', imageUrl: '', status:'', description:'', id:''});
  }

  const handleDelete = async (e: CreateCategoryPayload) => {
    setForm({...form, name: e.name, slug: e.slug, imageUrl: e.imageUrl, description: e.description, id: e.id});
    setOpen(true)
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load admins</p>;

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Category Management</h1>
            <Button 
              onClick={()=>setDialogOpen(true)}
            >
              Create New Category
            </Button>
          </div>

          <div className=" gap-8">
            {/* Form */}
              <Dialog open={dialogOpen} onOpenChange={onClose}>
                <DialogContent>
                  <CardHeader>
                    <CardTitle>{form?.id ? "Edit Category" : "Add Category"}</CardTitle>
                    <CardDescription>
                      {form?.id ? "Update category details" : "Create a new category"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={form?.id ? handleSubmitEdit : handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="e.g., Technology"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                          id="slug"
                          value={form.slug}
                          onChange={(e) => setForm({ ...form, slug: e.target.value })}
                          placeholder="Auto-generated from name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="slug">Category Image</Label>
                        <UploadImageForm imageFile={form.imageUrl} />
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={form.description}
                          onChange={(e) => setForm({ ...form, description: e.target.value })}
                          placeholder="Optional description"
                          rows={3}
                        />
                      </div>

                      <div className="flex space-x-2">
                        <Button type="submit" className="flex-1">
                          {form?.id ? "Update" : "Create"}
                        </Button>
                        {form?.id && (
                          <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </DialogContent>
              </Dialog>

            {/* List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>All Categories ({categories.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : categories.length === 0 ? (
                    <p className="text-muted-foreground">No categories yet. Create one to get started.</p>
                  ) : (
                    <div className="space-y-4 lg:space-y-0 lg:grid grid-cols-2 gap-4">
                      {categories.map((category) => (
                        <Card key={category.id}>
                          <CardHeader>
                            <div>
                              <img src={category.imageUrl} className="w-40" alt={category.name} />
                            </div>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{category.name}</CardTitle>
                                <CardDescription>
                                  Slug: {category.slug}
                                  {category.description && ` • ${category.description}`}
                                </CardDescription>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(category)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDelete(category)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Confirmation data={form} open={open} onSubmit={handleSubmitDelete} onClose={()=>setOpen(false)} />
      </div>
    </Layout>
  );
};

export default CategoryManager;
