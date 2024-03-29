import { useEffect, useRef, useState } from 'react';
import { EditIcon } from './icons';
import EditProfileModal from './modal/editProfileModal';

const DEFAULT_IMG_URL = 'https://dev-api.jmember.co.kr/image/my_default.png';

const ProfileInput = () => {
    const [selectedImgUrl, setSelectedImgUrl] = useState<any>(null); /* 선택된 프로필 이미지 url */
    const [editProfileModal, setEditProfileModal] =
        useState(false); /* 프로필 편집 아이콘 클릭 시 나타나는 모달 창 display 여부 */

    const fileInputRef = useRef<any>(null);
    const modalRef = useRef<any>();

    const SetDefaultImg = () => {
        setEditProfileModal(false);
        setSelectedImgUrl(null);
    };

    const ChangeProfileBtnClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const InputFile = (event: any) => {
        setEditProfileModal(false);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            return new Promise<void>((resolve) => {
                reader.onload = () => {
                    setSelectedImgUrl(reader.result || null);
                    resolve();
                };
            });
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (editProfileModal && (!modalRef.current || !modalRef.current.contains(e.target))) {
                setEditProfileModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editProfileModal]);

    return (
        <div>
            <div className='relative'>
                <div className='w-32 h-32 rounded-[55px] overflow-hidden flex justify-center'>
                    <img
                        src={selectedImgUrl ? selectedImgUrl : DEFAULT_IMG_URL}
                        alt='user'
                        width={128}
                        height={128}
                        className='object-cover'
                    />
                </div>
                <div className='absolute flex-shrink-0 z-40 cursor-pointer right-0 bottom-0'>
                    <div className='relative flex items-center justify-center w-10 h-10 border-[1px] bg-white border-gray-300 rounded-full'>
                        <div
                            onMouseDown={(e: any) => {
                                e.stopPropagation();
                                setEditProfileModal(!editProfileModal);
                            }}
                        >
                            <EditIcon />
                            <input
                                type='file'
                                className='hidden'
                                ref={fileInputRef}
                                accept='image/*'
                                onChange={InputFile}
                            />
                        </div>
                        {editProfileModal && (
                            <EditProfileModal
                                ref={modalRef}
                                onClick={ChangeProfileBtnClick}
                                selectedImg={selectedImgUrl}
                                setDefaultImg={SetDefaultImg}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfileInput;
