import LayoutComman from "../components/LayoutComman";
import OnBoardForm from "../components/OnBoardForm";
import SignInForm from "../components/SignInForm";

const SignInPage = () => {
    return (
        <>
            <LayoutComman title={'Sign in to your COR account'} form={<SignInForm />} />
        </>
    );
}

export default SignInPage;