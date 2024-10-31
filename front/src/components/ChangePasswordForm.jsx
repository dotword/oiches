import { Input } from './Input.jsx';
import { toast } from 'react-toastify';
import Toastify from './Toastify.jsx';
import ChangePasswordService from '../services/ChangePasswordService.js';

const ChangePasswordForm = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formValues = new FormData(e.target);
            const dataForm = {
                recoverPassCode: formValues.get('recoverPassCode'),
                email: formValues.get('email'),
                newPass: formValues.get('newPass'),
            };

            const password2 = formValues.get('password2');

            if (dataForm.newPass !== password2) {
                toast.error('Las contraseñas no coinciden');
                return;
            }

            await ChangePasswordService(dataForm);

            toast.success('Contraseña modificada');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex justify-between md:justify-evenly max-w-md flex-col gap-5 p-4 lg:w-1/3 mx-auto lg:mt-20 m-14"
            >
                <h1 className="text-4xl">Cambia tu contraseña</h1>
                <p>
                    Introduce tu código de recuperación, email y la nueva
                    contraseña que quieres utilizar
                </p>
                <div className="flex flex-col gap-4 justify-center">
                    <div>
                        <label htmlFor="recoverPassCode">
                            Código de recuperación*
                        </label>
                        <Input
                            type="text"
                            name="recoverPassCode"
                            placeholder="*****"
                            required
                            className="form-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email*</label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="miemail@mail.es"
                            required
                            className="form-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="newPass">Contraseña* </label>
                        <Input
                            type="password"
                            name="newPass"
                            placeholder="Yourpassword0?"
                            required
                            className="form-input"
                        />
                    </div>

                    <div>
                        <label htmlFor="password2">Repetir contraseña* </label>
                        <Input
                            type="password"
                            name="password2"
                            placeholder="Yourpassword0?"
                            required
                            className="form-input"
                        />
                    </div>

                    <button
                        type="submit"
                        className="p-4 w-full text-white hover:text-black hover:bg-opacity-80 transition-all bg-purpleOiches text-xl justify-center rounded"
                    >
                        Cambiar contraseña
                    </button>
                </div>
            </form>
            <Toastify />
        </>
    );
};

export default ChangePasswordForm;
