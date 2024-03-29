interface EditProfileModalProps {
    ref: React.RefObject<HTMLInputElement>;
    onClick: () => void;
    selectedImg: string | ArrayBuffer | null;
    setDefaultImg: () => void;
}

const EditProfileModal = ({ ref, onClick, selectedImg, setDefaultImg }: EditProfileModalProps) => {
    return (
        <div className='absolute w-40 z-40 py-1 bg-white rounded-md shadow-lg left-8 top-5' ref={ref}>
            <section
                className='block py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100'
                onClick={onClick}
            >
                프로필 변경
            </section>
            {selectedImg && (
                <section
                    className='block py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100'
                    onClick={setDefaultImg}
                >
                    기본 이미지로 설정
                </section>
            )}
        </div>
    );
};
export default EditProfileModal;
