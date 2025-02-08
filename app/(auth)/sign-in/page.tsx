import SignInForm from "@/features/sign-in/components/sign-in-form";

const SignInPage = async () => {
    return (
        <section className="flex h-screen w-screen items-center justify-center bg-cyan-200">
            <SignInForm />
        </section>
    );
};

export default SignInPage;
