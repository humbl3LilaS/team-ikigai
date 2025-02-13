"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { House, Loader2 } from "lucide-react";
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
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IUserInsert, UserInsertSchema } from "@/database/schema";
import { signUp } from "@/features/sign-up/actions/sign-up-action";
import { useToast } from "@/hooks/use-toast";

const SignUpForm = () => {
    const form = useForm<IUserInsert>({
        resolver: zodResolver(UserInsertSchema),
        defaultValues: {
            name: "",
            password: "",
            email: "",
            phoneNumber: "",
        },
        mode: "onChange",
    });

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit: SubmitHandler<IUserInsert> = async (values) => {
        const res = await signUp(values);
        if (!res.success) {
            return toast({
                title: "Failed to register",
                description: res.cause.reason,
                variant: "destructive",
            });
        }
        toast({
            title: "Successfully registered",
            description: "Your account created successfully",
        });
        return router.push("/");
    };
    return (
        <div className="flex w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Registration</CardTitle>
                    <CardDescription>
                        Enter your username, email address, phone, and password
                        to create a new account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name={"name"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={"Eg: Superman"}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"phoneNumber"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={"Eg: 09123456789"}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
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
                                        <FormMessage />
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
                                        <span>Signing Up..</span>
                                    </>
                                ) : (
                                    <span>Sign Up</span>
                                )}
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="font-bold">
                            Login
                        </Link>
                    </div>
                    <Button
                        asChild={true}
                        variant={"outline"}
                        className={"my-3 mx-auto block w-fit"}
                    >
                        <Link href={"/"} className={"flex"}>
                            <House />
                            <span>Go Back To Home</span>
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUpForm;
