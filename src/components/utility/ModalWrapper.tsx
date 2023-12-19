import { FC, ReactNode } from 'react';
import close from '../../assets/xClose.svg';

// Define the prop types
interface ModalProps {
  children: ReactNode;
  closeModal: () => void;
}

const ModalWrapper: FC<ModalProps> = ({ children, closeModal }) => {
  return (
    <div className="fixed inset-0 z-[20] flex items-center justify-center bg-gray-100/[0.7]">
      <div className="bg-dark rounded-lg p-6 md:p-16 relative max-h-[80%] max-w-[600px]">
        {/* Close Button */}
        <button className='absolute top-[16px] right-[16px] z-[100]' onClick={() => closeModal()}>
          <img src={close} alt="close modal" />
        </button>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
