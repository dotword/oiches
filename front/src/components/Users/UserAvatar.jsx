import { useState } from 'react';
import userIcon from '/DefaultProfile2.png';
import { FaPencilAlt } from 'react-icons/fa';
import { modifyUserAvatarService } from '../../services/Users/userEditService.js';
import { toast } from 'react-toastify';

const UserAvatar = ({ userData, userId, token }) => {
    const [avatar, setAvatar] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]);
        setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    };

    const handleAvatarSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('avatar', avatar);

            await modifyUserAvatarService({ data, userId, token });

            toast.success('Avatar cambiado con éxito');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <section className="mb-4 flex flex-col items-center gap-2 md:self-start">
            <p className="font-semibold text-2xl text-gray-900">
                {userData.user.username}
            </p>
            <form onSubmit={handleAvatarSubmit}>
                <div className="sect-photo w-40 h-40">
                    <FaPencilAlt className="absolute right-8 text-gray-900 text-2xl z-10" />
                    <span className="border-photos rounded-full">
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Vista previa"
                                className="w-40 h-40 object-cover"
                            />
                        ) : (
                            <img
                                src={
                                    userData.user.avatar
                                        ? `${
                                              import.meta.env.VITE_API_URL_BASE
                                          }/uploads/${userData.user.avatar}`
                                        : userIcon
                                }
                                alt="avatar"
                                className="w-40 h-40 object-cover"
                            />
                        )}
                        <input
                            type="file"
                            name="avatar"
                            className="absolute w-full h-full opacity-0 cursor-pointer"
                            onChange={handleAvatarChange}
                        />
                    </span>
                </div>
                {previewUrl && (
                    <div className="mt-3 max-w-80 text-center">
                        <input
                            type="submit"
                            value="Cambiar avatar"
                            className="btn-account max-w-44"
                        />
                    </div>
                )}
            </form>
        </section>
    );
};

export default UserAvatar;
