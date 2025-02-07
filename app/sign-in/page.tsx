import SignInForm from "@/features/sign-in/components/sign-in-form";

const SignInPage = async () => {
    return (
        <section className="w-screen h-screen flex justify-center items-center bg-cyan-200">
            <SignInForm />
        </section>
    );
};

export default SignInPage;
