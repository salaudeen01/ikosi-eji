/* eslint-disable @next/next/no-img-element */
"use client"
import CreateArticle from '@/components/CreateArticle'
import Layout from '@/components/layout/shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Calendar, CheckCheck, Eye, FilePlus, FileText, Pencil, Search, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Article, CreateArticlePayload } from '../../../../type'
import { useCreateArticle, useDeleteArticle, useFetchArticle, usePatchArticle, useUpdateArticle } from '@/hooks/mutatiion/useCreateArticle'
import { useUploadStore } from '@/store/useUploadStore'
import { useArticleStore } from '@/store/useArticleStore'
import { useSimpleArticleStore } from '@/hooks/ArticleStore'
import { useRouter } from 'next/navigation'
import Confirmation from '@/components/Confirmation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/store/useAuth'
import ArticleSkeleton from '@/components/ArticleSkeleton'
import { ErrorState } from '@/components/ui/error-state'

const Index = () => {

  const { imageUrl, setImage } = useUploadStore();
  const [content, setContent] = useState("");
  const [seValue, setSeValue] = useState("");
  const [open, setOpen] = useState(false);
  const [trash, setTrash] = useState(false);
  const [loading, setloading] = useState(false);
  const [section, setSection] = useState('main');
  const { setArticle } = useSimpleArticleStore();
  const router = useRouter();
  const { user } = useAuth();
  const [form, setForm] = useState<CreateArticlePayload>({
    title: "",
    slug: "",
    imageUrl: "",
    isBreak: '',
    status: "",
    progress: 0,
    progStatus: 'pending',
    location:'',
    summary: "",
    categoryId: "",
    content: "",
    type: "",
    videoUrl: "",
    id: ""
  });

  const {
    // search,
    status,
    page,
    setSearch,
    setStatus,
    setPage,
    resetFilters,
  } = useArticleStore();

  const { data, isLoading, error } = useFetchArticle();

  const createAMutation = useCreateArticle({
    onSuccessCallback: () =>{ 
      setloading(false);
      setSection('main');
      setForm({...form, title: '', slug: '', imageUrl: '', isBreak: '', type: '', status:'', summary:'', categoryId:'', content:'', videoUrl:'' });
      setImage('')
      setContent('')
    },
  });  
  const updateMutation = useUpdateArticle({
    onSuccessCallback: () =>{ 
      setloading(false);
      setSection('main');
      setForm({...form, title: '', slug: '', imageUrl: '', isBreak: '', type: '', status:'', summary:'', categoryId:'', content:'', videoUrl:'' });
      setImage('')
      setContent('')
    },
  });
  const patchMutation = usePatchArticle({
    onSuccessCallback: () =>{ 
      setloading(false);
      setSection('main');
      setOpen(false)
      setForm({...form, title: '', slug: '', imageUrl: '', type: '', isBreak: '', status:'', summary:'', categoryId:'', content:'', videoUrl:'' });
      setImage('')
      setContent('')
    },
  });

  const deleteMutation = useDeleteArticle({
    onSuccessCallback: () =>{ 
      setloading(false);
      setSection('main');
      setOpen(false)
      setForm({...form, title: '', slug: '', imageUrl: '', type: '', isBreak: '', status:'', summary:'', categoryId:'', content:'', videoUrl:'' });
      setImage('')
      setContent('')
    },
  });

  const handleClick = (e: Article) => {
    const slug = e?.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    setArticle({
      image: e?.imageUrl,
      category: e?.category?.name,
      title :e?.title,
      excerpt: e?.summary,
      // date: e?.createdAt,
      date: new Date(e.createdAt).toDateString(),
      author: e?.adminName,
    });
    router.push(`/${e?.category?.name}/article/1/${slug}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const payload: CreateArticlePayload ={...form, imageUrl: imageUrl || '', content: content}
    e.preventDefault();
    setloading(true);
    createAMutation.mutate(payload);
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    const payload: CreateArticlePayload ={...form, imageUrl: imageUrl || '', content: content}
    e.preventDefault();
    setloading(true);
    updateMutation.mutate(payload);
  };

  const handleSubmitDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);
    patchMutation.mutate(form);
  };

  const handleSubmitTrash = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);
    deleteMutation.mutate(form);
  };

  const handleDelete = async (e: Article) => {
    setForm({...form, title: e.title, slug: e.slug, imageUrl: e.imageUrl, summary: e.summary, status: e.status ==='draft' ? 'published': 'draft', id: String(e.id)});
    setOpen(true)
  };

  const handleTrash = async (e: Article) => {
    setForm({...form, title: e.title, slug: e.slug, imageUrl: e.imageUrl, summary: e.summary, status: e.status ==='draft' ? 'published': 'draft', id: String(e.id)});
    setTrash(true)
  };

  const handleEdit = (e: Article) => {
    setForm({...form, title: e.title, slug: e.slug, videoUrl: e.videoUrl, categoryId: String(e.categoryId), type: e.type, imageUrl: e.imageUrl, content: e.content, id: String(e.id), summary: e.summary});
    setSection('edit')
    setImage(e.imageUrl)
    setContent(e.content)
  };

  const handleCloseContent = ()=>{
    setSection('main');
    setForm({...form, title: '', slug: '', imageUrl: '', status:'', type: '',  summary:'', categoryId:'', content:'', videoUrl:'' });
    setImage('')
    setContent('')
  }
  
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Failed to load admins</p>;
  if (isLoading) return <ArticleSkeleton />;
  if (error) return (
    <ErrorState
      message="Failed to fetch article details."
      // onRetry={() => refetch()}
    />
  );

  return (
    <Layout>
      <div className="container mx-auto">
        {section === 'main' &&
          <>
            <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
              <h1 className="text-3xl py-2 lg:py-0 font-bold">Article Management</h1>
              <div className='flex flex-col md:flex-row gap-2'>
                {/* <div className='flex py-2 md:py-0'>
                  <Input 
                    className='w-full'
                    placeholder='search...'
                    value={seValue}
                    onChange={(e)=>setSeValue(e.target.value)}
                  />
                  <Button
                    onClick={() =>setSearch(seValue)}
                    className='rounded-r-lg'
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div> */}
                <Button onClick={()=>setSection('create')}>
                  Create New Article
                </Button>
              </div>
            </div>
            <div className=" mb-8">
              <div className='grid grid-cols-4 gap-2'>
                <div className='flex py-2 md:py-0'>
                  <Input 
                    className='rounded-r-none'
                    placeholder='search...'
                    value={seValue}
                    onChange={(e)=>setSeValue(e.target.value)}
                  />
                  <Button
                    onClick={() =>setSearch(seValue)}
                    className='rounded-r-lg rounded-l-none'
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className='flex gap-2'>
                  <Select value={status} onValueChange={(e) => setStatus((e))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={'draft'}>{`Draft`}</SelectItem>
                      <SelectItem value={'published'}>{`Published`}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant={`outline`} className='font-bold' onClick={()=>resetFilters()}>
                    Reset
                  </Button>
                </div>
              </div>
            </div>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Articles
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data?.stats.total}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Published
                  </CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data?.stats.published}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Drafts
                  </CardTitle>
                  <FilePlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data?.stats.draft}</div>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
              {data?.data?.map((item, index)=>(
                <Card
                  key={index}
                  className="overflow-hidden border border-border-color hover:shadow-lg transition-shadow cursor-pointer group"
                  // onClick={()=>(console.log('first'))}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item?.imageUrl || ''}
                      alt={item?.imageUrl || ''}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className='flex justify-between'>
                      <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-0">
                        {item?.categoryName}
                      </Badge>
                      <Badge className="mb-2 bg-gray-300 text-black hover:bg-primary/20 border-0">
                        {item?.status}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {item?.title}
                    </h3>
                    <p className="text-sm text-text-muted mb-3 line-clamp-2">
                      {item?.summary}
                    </p>
                    <div className="flex items-center text-xs text-text-muted">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(item.createdAt).toDateString()}
                    </div>
                    <div className="flex space-x-2 pt-4">
                      <Button
                        variant="outline"
                        className='text-[#0F172A]'
                        size="sm"
                        onClick={() =>(handleEdit(item))}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {user?.role !== 'editor' &&
                      item?.status === 'draft' &&
                        <Button
                          variant="default" // destructive
                          size="sm"
                          onClick={() =>(handleDelete(item))}
                        >
                          {/* <Trash2 className="h-4 w-4" /> */}
                          <CheckCheck className="h-4 w-4" />
                          Publish
                        </Button>
                      }
                      {user?.role !== 'editor' &&
                      item?.status === 'published' &&
                        <Button
                          variant="destructive" // destructive
                          size="sm"
                          onClick={() =>(handleDelete(item))}
                        >
                          {/* <Trash2 className="h-4 w-4" /> */}
                          <CheckCheck className="h-4 w-4" />
                          Draft
                        </Button>
                      }
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() =>(handleClick(item))}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>(handleTrash(item))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <span>👁️ {item.viewNo} views</span>
                      <span>📤 {item.shareNo} shares</span>
                      {/* <span>🔖 {item.saveNo} saves</span> */}
                    </div>
                  </CardContent>

                </Card>
              ))}
            </div>
            {data?.pagination && (
              <div className="mt-4 flex justify-between items-center text-sm">
                <span>
                  Page {data?.pagination.page} of {data?.pagination.totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <button
                    disabled={page >= data?.pagination.totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        }
        {section === 'create' &&
          <CreateArticle loading={loading} form={form} setForm={setForm} setSection={()=>handleCloseContent()} content={content} setContent={setContent} pageTitle='Create New Article' handleSubmit={handleSubmit} />
        }
        {section === 'edit' &&
          <CreateArticle loading={loading} form={form} setForm={setForm} setSection={()=>handleCloseContent()} content={content} setContent={setContent} pageTitle="Edit Article" handleSubmit={handleSubmitEdit} />
        }
      </div>

      <Confirmation loading={loading} name={form?.title} status={form?.status === 'draft' ? 'publish': 'draft'} open={open} onSubmit={handleSubmitDelete} onClose={()=>setOpen(false)} />

      <Confirmation loading={loading} name={form?.title} status={'delete'} open={trash} onSubmit={handleSubmitTrash} onClose={()=>setTrash(false)} />

    </Layout>
  )
}

export default Index