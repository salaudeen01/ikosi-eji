// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ArticleEditor from "./ui/ArticleEditor";
import { CreateArticlePayload } from "../../type";
import UploadImageForm from "./UploadFile";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useFetchCategories } from "@/hooks/mutatiion/useCreateCategory";

type ArticleProps ={
  setSection: ()=>void;
  pageTitle?: string;
  form: CreateArticlePayload;
  setForm: React.Dispatch<React.SetStateAction<CreateArticlePayload>>;
  content: string;
  setContent: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void | Promise<void>;
}

const CreateArticle = ({setSection, pageTitle, form, setForm, content, setContent, handleSubmit}:ArticleProps) => {
  // const [published, setPublished] = useState(false);
  // const [loading, setLoading] = useState(false);

  const { categories } = useCategoryStore();
  const { isLoading, isError } = useFetchCategories();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load admins</p>;

  // const hanSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   handleSubmit
  // };
console.log(form?.categoryId)

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div className="">
        <Card>
          <CardHeader>
            <CardTitle>{pageTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form?.title}
                  onChange={(e) => setForm({...form, title: e.target.value})}
                  required
                  placeholder="Article title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={form?.slug}
                  onChange={(e) => setForm({...form, slug: e.target.value})}
                  required
                  placeholder="article-slug"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={form?.categoryId} onValueChange={(e) => setForm({...form, categoryId: String(e)})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((ca)=>(
                      <SelectItem key={ca.id} value={String(ca.id)}>{ca.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Input
                  id="excerpt"
                  value={form?.summary}
                  onChange={(e) => setForm({...form, summary: e.target.value})}
                  placeholder="Brief summary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Select Article Type</Label>
                <Select value={form?.type} onValueChange={(e) => setForm({...form, type: e})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="content">Content</SelectItem>
                    <SelectItem value="video">video</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="slug">Image Url</Label>
                <UploadImageForm imageFile={form.imageUrl} />
              </div>
              {form?.type === 'video' &&
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <Input
                    id="videoUrl"
                    value={form?.videoUrl}
                    onChange={(e) => setForm({...form, videoUrl: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              }
              {form?.type === 'content' &&
                <div className="space-y-2">
                  <Label>Content</Label>
                  <ArticleEditor value={content} onChange={setContent} />
                </div>
              }

              {/* <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={published}
                  onCheckedChange={setPublished}
                />
                <Label htmlFor="published">Publish article</Label>
              </div> */}

              <div className="flex space-x-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Create Article"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={setSection}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateArticle;
