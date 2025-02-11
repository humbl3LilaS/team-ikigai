"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import PasswordField from "@/components/share/client/password-field";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInWithCredential } from "@/features/sign-in/actions/sign-in-actions";
import { useToast } from "@/hooks/use-toast";
import { SignInSchema, SignInSchemaType } from "@/validation";

const SignInForm = () => {
    const form = useForm<SignInSchemaType>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter();
    const { toast } = useToast();

    const onSubmit: SubmitHandler<SignInSchemaType> = async (values) => {
        const res = await signInWithCredential(values);
        if (!res.success) {
            return toast({
                title: "Login Failed",
                description: res.cause.reason,
                variant: "destructive",
            });
        }
        toast({
            title: "Successfully Login",
        });
        return router.push("/");
    };
    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email address and password to login to your
                        account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name={"email"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={
                                                    "Eg: super@gmail.com"
                                                }
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
                                className={"mt-4 w-full"}
                                type={"submit"}
                                disabled={
                                    form.formState.isSubmitting ||
                                    !form.formState.isValid
                                }
                            >
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2
                                            className={
                                                "mr-2 inline-block animate-spin"
                                            }
                                        />
                                        <span>Signing In..</span>
                                    </>
                                ) : (
                                    <span>Sign In</span>
                                )}
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/sign-up" className="font-bold">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignInForm;
