"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { IUserInsert, UserInsertSchema } from "@/database/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordField from "@/components/share/client/password-field";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signUp } from "@/features/sign-up/actions/sign-up-action";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
    const form = useForm<IUserInsert>({
        resolver: zodResolver(UserInsertSchema),
        defaultValues: {
            name: "",
            password: "",
            email: "",
            phoneNumber: "",
        },
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
        <Form {...form}>
            <div
                className={
                    "w-full max-w-screen-sm rounded-md bg-white p-10 shadow-md"
                }
            >
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                        placeholder={"Eg: super@gmail.com"}
                                        {...field}
                                    />
                                </FormControl>
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
                                <span>Signing Up..</span>
                            </>
                        ) : (
                            <span>Sign Up</span>
                        )}
                    </Button>
                </form>
            </div>
        </Form>
    );
};

export default SignUpForm;
