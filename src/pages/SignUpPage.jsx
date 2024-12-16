import LayoutComman from "../components/LayoutComman";
import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
    return (
        <>
            <LayoutComman title={'Your COR experience starts here'} form={<SignUpForm />} />
        </>
    );
}

export default SignUpPage;