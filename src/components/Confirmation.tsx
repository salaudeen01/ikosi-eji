import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { OctagonAlert } from 'lucide-react'
import { Button } from './ui/button'
// import { CreateArticlePayload, CreateCategoryPayload } from '../../type'

type ConfirmProps = {
  open: boolean;
  loading?: boolean;
  name?: string;
  status?: string;
  onClose: ()=>void;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  // data: CreateCategoryPayload | CreateArticlePayload
}

const Confirmation = ({open, loading, onClose, name, status, onSubmit}: ConfirmProps) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className='text-center'>
              <OctagonAlert className={`mx-auto mb-4 h-14 w-14 ${status === 'draft'? 'text-[hsl(var(--primary))]': 'text-red-400'}`} />
              {status === 'delete' && 
                <DialogTitle>
                  {loading ? (
                    "Drafting..."
                  ) : (
                    <>
                      Are you sure you want to delete this
                      <br />
                      <br />
                      {name}
                    </>
                  )}
                </DialogTitle>
              }
              {status !== 'delete' &&
              <DialogTitle>
                {loading ? (
                  "Loading..."
                ) : (
                  <>
                    Are you sure you want to move this
                    <br />
                    <br />
                    {name}
                    <br />
                    <br />
                    {status === "draft" ? "publish" : "draft"}
                  </>
                )}
              </DialogTitle>
              }
            </DialogDescription>
            <div className='py-5 flex gap-4'>
              <Button variant={status === 'draft' ?`default`:`destructive`} onClick={onSubmit} className='w-full'>
                {`Yes, I'm sure`}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className='w-full'>
                No, cancel
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Confirmation