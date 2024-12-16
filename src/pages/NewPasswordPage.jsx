import LayoutComman from "../components/LayoutComman";
import NewPasswordForm from "../components/NewPasswordForm";

const NewPasswordPage = () => {
    return (
        <>
            <LayoutComman title={''} form={<NewPasswordForm />} />
        </>
    );
}

export default NewPasswordPage;