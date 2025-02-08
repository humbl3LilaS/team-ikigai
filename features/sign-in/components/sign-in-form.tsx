"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { SignInSchema, SignInSchemaType } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import PasswordField from "@/components/share/password-field";
import { Input } from "@/components/ui/input";
import { signInWithCredential } from "@/features/sign-in/actions/sign-in-actions";

const SignInForm = () => {
    const form = useForm<SignInSchemaType>({
        resolver: zodResolver(SignInSchema),
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<SignInSchemaType> = async (values) => {
        const res = await signInWithCredential(values);
        if (!res.success) {
            return;
        }
        return router.push("/");
    };
    return (
        <Form {...form}>
            <div
                className={
                    "w-full max-w-screen-sm rounded-md bg-white p-10 shadow-md"
                }
            >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name={"email"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={"Eg: Superman"}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"password"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <PasswordField
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        className={"mt-4"}
                        type={"submit"}
                        disabled={
                            form.formState.isSubmitting ||
                            !form.formState.isValid
                        }
                    >
                        {form.formState.isSubmitting ? (
                            <>
                                <Loader2
                                    className={"mr-2 inline-block animate-spin"}
                                />
                                <span>Signing In..</span>
                            </>
                        ) : (
                            <span>Sign In</span>
                        )}
                    </Button>
                </form>
            </div>
        </Form>
    );
};

export default SignInForm;
