/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Crown, Edit, Pencil, ShieldOff, Trash2, User } from "lucide-react";
import Layout from "@/components/layout/shell";
import UploadImageForm from "@/components/UploadFile";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, CreateMemberPayload, Member } from "../../../../type";
import { useUploadStore } from "@/store/useUploadStore";
import { useFetchCategories, usePatchCategory, useUpdateCategory } from "@/hooks/mutatiion/useCreateCategory";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Confirmation from "@/components/Confirmation";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import { ErrorState } from "@/components/ui/error-state";
import EmptyState from "@/components/EmptyState";
import { useCreateMember, useFetchMember, useUpdateMember } from "@/hooks/mutatiion/useCreateMember";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";


const CategoryManager = () => {
  const { imageUrl, setImage } = useUploadStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const { categories } = useCategoryStore(); // page, total, nextPage, prevPage, setSearch
  const { data, isLoading, isError, refetch } = useFetchMember();
  console.log(data)

  const [form, setForm] = useState<CreateMemberPayload>({
    name: "",
    title: "",
    imageUrl:"",
    insight: "",
    role: "",
    id: "",
  });

  const createMutation = useCreateMember({
    onSuccessCallback: () =>{ 
      setDialogOpen(false);
      setForm({...form, name: '', title: '', imageUrl: '', insight:'', role:''});
      setImage('')
      setloading(false);
    },
  });

  const updateMutation = useUpdateMember({
    onSuccessCallback: () =>{ 
      setDialogOpen(false);
      setForm({...form, name: '', title: '', imageUrl: '', insight:'', role:''});
      setImage('')
      setloading(false);
    },
  });

  const patchCategoryMutation = usePatchCategory({
    onSuccessCallback: () =>{ 
      setOpen(false);
      setForm({...form, name: '', title: '', imageUrl: '', insight:'', role:''});
      setImage('')
      setloading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    const payload: CreateMemberPayload ={...form, imageUrl: imageUrl || ''}
    e.preventDefault();
    setloading(true);
    createMutation.mutate(payload);
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    const payload: CreateMemberPayload = {...form, imageUrl: imageUrl || ''}
    e.preventDefault();
    setloading(true);
    updateMutation.mutate(payload);
  };

  const handleSubmitDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);
    // patchCategoryMutation.mutate(form);
  };

  const handleEdit = (category: Member) => {
    setForm({...form, name: category.name, title: category.title, insight: category.insight, imageUrl: category.imageUrl, role: category.role, id: category.id});
    setDialogOpen(true)
    setImage(category.imageUrl)
  };

  const onClose =()=>{
    setDialogOpen(false);
    setForm({...form, name: '', title: '', imageUrl: '', insight:'', role:''});
    setImage('')
  }

  const handleDelete = async (e: CreateMemberPayload) => {
    setForm({...form, name: e.name, role: e.role, imageUrl: e.imageUrl, insight: e.insight, id: e.id});
    setOpen(true)
  };

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Failed to load admins</p>;
  if (isLoading) return <ArticleSkeleton />;
  if (isError) return (
    <ErrorState
      message="Failed to fetch article details."
      onRetry={() => refetch()}
    />
  );

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Member Management</h1>
            <Button 
              onClick={()=>setDialogOpen(true)}
            >
              Create New Member
            </Button>
          </div>

          <div className=" gap-8">
            {/* Form */}
              <Dialog open={dialogOpen} onOpenChange={onClose}>
                <DialogContent>
                  <CardHeader>
                    <CardTitle>{form?.id ? "Edit Member" : "Add Member"}</CardTitle>
                    <CardDescription>
                      {form?.id ? "Update member details" : "Create a new member"}
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
                          placeholder="Enter member name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="name">Title *</Label>
                        <Input
                          id="name"
                          value={form.title}
                          onChange={(e) => setForm({ ...form, title: e.target.value })}
                          placeholder="enter title (e.g. Chairman, Vice Chairman, etc.)"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Select Role</Label>
                        <Select value={form?.role} onValueChange={(e) => setForm({...form, role: e})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="executive">Executive</SelectItem>
                            <SelectItem value="legislators">Legislators</SelectItem>
                            <SelectItem value="management">Management</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="slug">Member Picture</Label>
                        <UploadImageForm imageFile={form.imageUrl} />
                      </div>

                      <div>
                        <Label htmlFor="description">Member Insight</Label>
                        <Textarea
                          id="description"
                          value={form.insight}
                          onChange={(e) => setForm({ ...form, insight: e.target.value })}
                          placeholder="Optional Insight about the member"
                          rows={3}
                        />
                      </div>

                      <div className="flex space-x-2">
                        <Button type="submit" className="flex-1" disabled={loading}>
                          {loading ? (form?.id ? "Updating..." : "Creating...") : form?.id ? "Update" : "Create"}
                          {/* {form?.id ? "Update" : "Create"} */}
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
                  <CardTitle>All Member ({data?.data.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : data?.data.length === 0 ? (
                    <EmptyState /> 
                  ) : (
                    <div className="space-y-4 lg:space-y-0 lg:grid grid-cols-2 gap-4">
                      {data?.data.map((category) => (
                        <Card key={category.id}>
                          <CardHeader>
                            <div>
                              <img src={category.imageUrl || ''} className="w-40" alt={category.name} />
                            </div>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{category.name}</CardTitle>
                                <CardDescription>
                                  Slug: {category.slug}
                                  {category.role && ` • ${category.role}`}
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

                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead className=""></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data?.data.map((e) => (
                          <TableRow key={e.id}>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className="text-xs">You</Badge>
                                {e.title}
                              </div>
                            </TableCell>
                            <TableCell>
                              {e.name}
                            </TableCell>
                            <TableCell>
                              {e.role === "e" ? (
                                <Badge variant="default" className="gap-1 uppercase">
                                  <Crown className="h-3 w-3" />
                                  {e.role}
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="gap-1 uppercase">
                                  <User className="h-3 w-3" />
                                  {e.role}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {new Date(e.createdAt).toLocaleDateString()}
                            </TableCell>
                              {/* {user?.role === "e" && (
                                <TableCell className="text-right flex gap-1">
                                  <Button
                                    variant={e.status === 'active' ? "destructive":'default'}
                                    size="sm"
                                    onClick={() => handleDelete(e)}
                                  >
                                    <ShieldOff className="h-4 w-4 mr-2" />
                                    {e.status === 'active' ? 'Revoke e': 'Grant e'}
                                  </Button>
                                  <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleEdit(e)}
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </Button>

                                </TableCell>
                              )} */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Confirmation loading={loading} name={form?.name} status="delete" open={open} onSubmit={handleSubmitDelete} onClose={()=>setOpen(false)} />
      </div>
    </Layout>
  );
};

export default CategoryManager;
