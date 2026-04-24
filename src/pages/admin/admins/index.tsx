// import { CreateAdminPayload } from '@/api/admin'
import Layout from '@/components/layout/shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCreateAdmin, useFetchAdmins, usePatchAdmin, useUpdateAdmin } from '@/hooks/mutatiion/useCreateAdmin'
import { Crown, Edit, Search, ShieldOff, User } from 'lucide-react'
import React, { useState } from 'react'
import { Admin, CreateAdminPayload } from '../../../../type'
import { useAdminStore } from '@/store/useAdminStore'
import { useAuth } from '@/store/useAuth'
import Confirmation from '@/components/Confirmation'
import ArticleSkeleton from '@/components/ArticleSkeleton'
import { ErrorState } from '@/components/ui/error-state'

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { admins } = useAdminStore();// page, total, nextPage, prevPage, setSearch
  const [open, setOpen] = useState(false);
  const { isLoading, isError, refetch } = useFetchAdmins();
  const { user } = useAuth();

  const [form, setForm] = useState<CreateAdminPayload>({
    name: "",
    email: "",
    password: "password1@",
    role: "",
    status: "",
    id: "",
    phone: "",
  });

  const createAdminMutation = useCreateAdmin({
    onSuccessCallback: () =>{ 
      setDialogOpen(false);
      setForm({...form, name: '', email: '', role: '', status:''});
    },
  });

  const updateAdminMutation = useUpdateAdmin({
    onSuccessCallback: () =>{ 
      setDialogOpen(false);
      setForm({...form, name: '', email: '', phone: '', role: '', id:'', status:''});
    },
  });

  const patchMutation = usePatchAdmin({
    onSuccessCallback: () =>{ 
      setOpen(false);
      setForm({...form, name: '', email: '', password: '', phone:'', role:'', status:''});
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAdminMutation.mutate(form);
    onClose()
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminMutation.mutate(form);
    onClose()
  };

  const handleSubmitDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    patchMutation.mutate(form);
    setOpen(true)
  };

  const onClose =()=>{
    setDialogOpen(false);
    setForm({...form, name: '', email: '', role: '', phone: '', id:''});
  }

  const openEdit =(e:Admin)=>{
    setForm({...form, email: e.email, name: e.name, role: e.role, id: e.id, phone: e.phone})
    setDialogOpen(true)
  }
  const handleDelete = async (e: Admin, b:string) => {
    setForm({...form, email: e.email, name: e.name, role: e.role, id: e.id, phone: e.phone, status: b})
    setOpen(true)
  };

  const users = [
    {
      id: 1,
      email: "user1@mail.com",
      name: "Admin !",
      role: "admin",
      created_at: "September 22, 2025",
    },
    {
      id: 2,
      email: "user2@mail.com",
      name: "Admin 2",
      role: "publisher",
      created_at: "September 21, 2025",
    },
    {
      id: 3,
      email: "user3@mail.com",
      name: "Admin 3",
      role: "editor",
      created_at: "September 20, 2025",
    },
  ];

  if (isLoading) return <ArticleSkeleton />;
  if (isError) return (
    <ErrorState
      message="Failed to fetch article details."
      onRetry={() => refetch()}
    />
  );

  return (
    <Layout>
      <div className="flex flex-wrap justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Management</h1>
        <div className='flex gap-2'>
          <div className='flex'>
            <Input 
              className='w-full'
              placeholder='search...'
            />
            <Button
              // onClick={() =>(setSection('edit'))}
              className='rounded-r-lg'
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          {user?.role === 'admin' &&
            <Button 
              onClick={()=>setDialogOpen(true)}
            >
              Create New Admin
            </Button>
          }
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{form.id ? 'Edit Admin':'Add New Admin'}</DialogTitle>
                  {!form?.id &&
                    <DialogDescription>
                      Enter the email address of an existing user to grant admin privileges
                    </DialogDescription>
                  }
                </DialogHeader>
                <form onSubmit={form?.id ? handleSubmitEdit : handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter full name"
                      value={form?.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@example.com"
                      value={form?.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Phone Number</Label>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="Enter Phone"
                      value={form?.phone}
                      onChange={(e) => setForm({...form, phone: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Select Role</Label>
                    {/* <Select value={category} onValueChange={setCategory}> */}
                    <Select
                      value={form?.role}
                      onValueChange={(e) => setForm({...form, role: e})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Executive</SelectItem>
                        <SelectItem value="publisher">Publisher</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => onClose()}>
                      Cancel
                    </Button>
                    {form?.id ?
                    <Button disabled={updateAdminMutation.isPending} type="submit">{updateAdminMutation.isPending ? 'Loading...': 'Edit Admin'}</Button>:
                    <Button disabled={createAdminMutation.isPending} type="submit">{createAdminMutation.isPending ? 'Loading...': 'Grant Admin Role'}</Button>
                    }
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : users.length === 0 ? (
            <p className="text-muted-foreground">No users found.</p>
          ) : (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className=""></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell>
                        {admin.name}
                        {/* {new Date(admin.created_at).toLocaleDateString()} */}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {admin.email}
                          {/* {admin.id === session?.admin.id && ( */}
                            <Badge variant="outline" className="text-xs">You</Badge>
                          {/* )} */}
                        </div>
                      </TableCell>
                      <TableCell>
                        {admin.phone}
                      </TableCell>
                      <TableCell>
                        {admin.role === "admin" ? (
                          <Badge variant="default" className="gap-1 uppercase">
                            <Crown className="h-3 w-3" />
                            {admin.role}
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1 uppercase">
                            <User className="h-3 w-3" />
                            {admin.role}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(admin.createdAt).toLocaleDateString()}
                      </TableCell>
                        {user?.role === "admin" && (
                          <TableCell className="text-right flex gap-1">
                            <Button
                              variant={admin.status === 'active' ? "destructive":'default'}
                              size="sm"
                              onClick={() => handleDelete(admin, admin.status === 'active' ? "archived":'active')}
                              // disabled={admin.id === session?.admin.id}
                            >
                              <ShieldOff className="h-4 w-4 mr-2" />
                              {admin.status === 'active' ? 'Revoke Admin': 'Grant Admin'}
                            </Button>
                            {/* // ) : (
                            //   <Button
                            //     variant="default"
                            //     size="sm"
                            //     // onClick={() => handleGrantAdmin(admin.id)}
                            //   >
                            //     <Shield className="h-4 w-4 mr-2" />
                            //     Grant Admin
                            //   </Button> */}
                            <Button
                            variant="default"
                            size="sm"
                            onClick={() => openEdit(admin)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>

                          </TableCell>
                        )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

<     Confirmation name={form?.name} loading={isLoading} status="delete" open={open} onSubmit={handleSubmitDelete} onClose={()=>setOpen(false)} />
    </Layout>
  )
}

export default Index