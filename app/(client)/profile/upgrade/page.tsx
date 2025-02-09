"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { placeholderUsers, regionCityMap } from "../userdata";

// 🚀 Zod Validation Schema
const AccountUpgradeSchema = z.object({
    businessName: z.string().min(1, "Business Name is required"),
    businessSize: z.enum(["Small", "Medium", "Large"], {
        errorMap: () => ({ message: "Select a valid business size" }),
    }),
    region: z.string().min(1, "Region is required"),
    city: z.string().min(1, "City is required"),
    website: z
        .string()
        .optional()
        .refine((url) => !url || url.startsWith("http"), {
            message: "Invalid website URL (must start with http/https)",
        }),
    description: z.string().optional(),
});

type AccountUpgradeSchemaType = z.infer<typeof AccountUpgradeSchema>;

const AccountUpgradeForm = () => {
    const [user, setUser] = useState<(typeof placeholderUsers)[0] | null>(null);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setUser(placeholderUsers[0]); // Ensuring placeholderUsers isn't accessed during SSR
        setHydrated(true); // Prevent hydration errors by ensuring client-only rendering
    }, []);

    const form = useForm<AccountUpgradeSchemaType>({
        resolver: zodResolver(AccountUpgradeSchema),
        defaultValues: {
            businessName: "",
            businessSize: "Small",
            region: "",
            city: "",
            website: "",
            description: "",
        },
        mode: "onChange",
    });

    const selectedRegion = form.watch("region");
    const filteredCity =
        regionCityMap[selectedRegion as keyof typeof regionCityMap] || [];

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (values: AccountUpgradeSchemaType) => {
        console.log("Submitting form with values:", values);

        // Simulate API request (Replace with actual request logic)
        setTimeout(() => {
            toast({
                title: "Upgrade Request Submitted",
                description:
                    "Your business account upgrade request is being processed.",
            });

            router.push("/dashboard"); // Redirect to dashboard after success
        }, 1000);
    };

    if (!hydrated) return null; // Avoid SSR mismatches

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">
                Upgrade to Business Account
            </h2>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {/* Business Name */}
                    <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter business name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Business Size (Dropdown) */}
                    <FormField
                        control={form.control}
                        name="businessSize"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business Size</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value || "Small"} // Prevents hydration issues
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Small">
                                                Small (1-10 employees)
                                            </SelectItem>
                                            <SelectItem value="Medium">
                                                Medium (11-50 employees)
                                            </SelectItem>
                                            <SelectItem value="Large">
                                                Large (50+ employees)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Region Selection */}
                    <FormField
                        control={form.control}
                        name="region"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Region</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value || ""}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a region" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.keys(regionCityMap).map(
                                                (region) => (
                                                    <SelectItem
                                                        key={region}
                                                        value={region}
                                                    >
                                                        {region}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* City Selection */}
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value || ""}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a city" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {filteredCity.map((city) => (
                                                <SelectItem
                                                    key={city}
                                                    value={city}
                                                >
                                                    {city}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Website (Optional) */}
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website (Optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="url"
                                        placeholder="https://yourbusiness.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Business Description (Optional) */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Business Description</FormLabel>
                                <FormControl>
                                    <textarea
                                        className="min-w-[50px]"
                                        placeholder="Briefly describe your business"
                                        {...field}
                                        rows={3}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="bg-blue-600 w-full py-2 rounded-md transition"
                        disabled={
                            !form.formState.isValid ||
                            form.formState.isSubmitting
                        }
                    >
                        {form.formState.isSubmitting ? (
                            <Loader2 className="mr-2 animate-spin" />
                        ) : (
                            "Upgrade Account"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AccountUpgradeForm;
