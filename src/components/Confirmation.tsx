import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { OctagonAlert } from 'lucide-react'
import { Button } from './ui/button'
import { CreateCategoryPayload } from '../../type'

type ConfirmProps = {
  open: boolean;
  onClose: ()=>void;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  data: CreateCategoryPayload
}

const Confirmation = ({open, onClose, data, onSubmit}: ConfirmProps) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className='text-center'>
              <OctagonAlert className='mx-auto mb-4 h-14 w-14 text-red-400' />
              <DialogTitle>Are you sure you want to delete</DialogTitle>
              {data?.name}
            </DialogDescription>
            <div className='py-5 flex gap-4'>
              <Button variant={`destructive`} onClick={onSubmit} className='w-full'>
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