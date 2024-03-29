import { DialogTitle } from '@mui/material';
import { CloseIcon } from '@/app/components/icons';

const DialogHeader = ({ title, onClose }: { title: string; onClose: () => void }) => {
    return (
        <>
            <DialogTitle sx={{ padding: 0 }}>
                <div className='flex items-center justify-between border-b-2 border-gray-100 py-4 pl-5 pr-6 w-[512px]'>
                    <p className='font-bold text-lg'>{title}</p>
                    <div className='w-5 h-5 text-gray-400 cursor-pointer' onClick={onClose}>
                        <CloseIcon />
                    </div>
                </div>
            </DialogTitle>
        </>
    );
};
export default DialogHeader;
