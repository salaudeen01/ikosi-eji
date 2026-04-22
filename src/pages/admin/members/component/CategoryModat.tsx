import Modal from '@/components/ui/modal'
import React from 'react'

const CategoryModat = () => {
  return (
    <div>
      <Modal isOpen={false} size="md" onClose={()=>(false)} className='p-10' title={'Call Or Chat Us'}>
        Create
      </Modal>
    </div>
  )
}

export default CategoryModat