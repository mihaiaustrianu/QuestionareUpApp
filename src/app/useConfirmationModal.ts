import { useState } from "react"

interface ConfirmationModalOptions {
  onConfirm: () => void
  onCancel: () => void
}

const useConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmationModalOptions | null>(null)

  const openModal = (options: ConfirmationModalOptions) => {
    setOptions(options)
    setIsOpen(true)
  }

  const closeModal = () => {
    setOptions(null)
    setIsOpen(false)
  }

  return {
    isOpen,
    openModal,
    closeModal,
    options,
  }
}

export default useConfirmationModal
