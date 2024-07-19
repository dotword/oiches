import RecoverPasswordForm from '../components/RecoverPasswordForm';
import MenuForms from '../components/MenuForms';

export const RecuperarPassword = () => {
    return (
        <div className="md:flex md:w-screen">
            <MenuForms />
            <RecoverPasswordForm className="flex justify-between md:justify-evenly max-w-md flex-col gap-5 p-4 lg:w-1/3 mx-auto lg:mt-20" />
        </div>
    );
};
