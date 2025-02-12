"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, CircleChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { REGION, TOWNSHIPS } from "@/constants";
import { useToast } from "@/hooks/use-toast";

import { registerBusiness } from "../actions/register-business-account";
import {
    BusinessRegistrationSchema,
    BusinessRegistrationType,
} from "../type/business-table";

export default function BusinessRegistrationForm() {
    const form = useForm<BusinessRegistrationType>({
        resolver: zodResolver(BusinessRegistrationSchema),
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

    const [regionOpen, setRegionOpen] = useState(false);
    const [cityOpen, setCityOpen] = useState(false);
    const selectedRegion = form.watch("region");
    const filteredCity =
        TOWNSHIPS[selectedRegion as keyof typeof TOWNSHIPS] || [];

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (data: BusinessRegistrationType) => {
        const response = await registerBusiness("user-id-placeholder", data); // Replace with actual user ID
        if (response.success) {
            toast({
                title: "Registration Successful",
                description: response.message,
            });
            router.push("/profile");
        } else {
            toast({
                title: "Registration Failed",
                description: response.message,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                    <Button variant="link">
                        <Link href="/profile">
                            <CircleChevronLeft
                                style={{
                                    width: "1.5rem",
                                    height: "1.5rem",
                                }}
                            />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">
                        Register as a Business
                    </h1>
                </div>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
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

                    <FormField
                        control={form.control}
                        name="businessSize"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business Size</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select business size" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Small">
                                            Small
                                        </SelectItem>
                                        <SelectItem value="Medium">
                                            Medium
                                        </SelectItem>
                                        <SelectItem value="Large">
                                            Large
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="region"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Region</FormLabel>
                                <FormControl>
                                    <DropdownMenu onOpenChange={setRegionOpen}>
                                        <DropdownMenuTrigger asChild>
                                            <div className="relative w-full cursor-pointer">
                                                <Input
                                                    readOnly
                                                    value={field.value || ""}
                                                    placeholder="Select a region"
                                                    className="cursor-pointer"
                                                />
                                                <ChevronDown
                                                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform ${
                                                        regionOpen
                                                            ? "rotate-180"
                                                            : ""
                                                    }`}
                                                    size={20}
                                                />
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="min-w-[var(--radix-popper-anchor-width)] bg-white shadow-md rounded-md max-h-[200px] overflow-auto z-50"
                                            side="bottom"
                                            align="start"
                                            sideOffset={4}
                                        >
                                            {REGION.map((region) => (
                                                <DropdownMenuItem
                                                    key={region}
                                                    onSelect={() =>
                                                        field.onChange(region)
                                                    }
                                                    className="w-full cursor-pointer px-3 py-2 hover:bg-gray-100"
                                                >
                                                    {region}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <DropdownMenu onOpenChange={setCityOpen}>
                                        <DropdownMenuTrigger asChild>
                                            <div className="relative w-full cursor-pointer">
                                                <Input
                                                    readOnly
                                                    value={field.value || ""}
                                                    placeholder="Select a city"
                                                    className="cursor-pointer"
                                                />
                                                <ChevronDown
                                                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform ${
                                                        cityOpen
                                                            ? "rotate-180"
                                                            : ""
                                                    }`}
                                                    size={20}
                                                />
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="min-w-[var(--radix-popper-anchor-width)] bg-white shadow-md rounded-md max-h-[200px] overflow-auto z-50"
                                            side="bottom"
                                            align="start"
                                            sideOffset={4}
                                        >
                                            {filteredCity.length > 0 ? (
                                                filteredCity.map((city) => (
                                                    <DropdownMenuItem
                                                        key={city}
                                                        onSelect={() =>
                                                            field.onChange(city)
                                                        }
                                                        className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                                                    >
                                                        {city}
                                                    </DropdownMenuItem>
                                                ))
                                            ) : (
                                                <DropdownMenuItem
                                                    disabled
                                                    className="cursor-not-allowed px-3 py-2 text-gray-400"
                                                >
                                                    Select a region first
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter website URL"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business Description</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Describe your business"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        variant={"default"}
                        type="submit"
                        className=" w-full py-2 rounded-md transition"
                        disabled={
                            !form.formState.isValid ||
                            form.formState.isSubmitting
                        }
                    >
                        {form.formState.isSubmitting ? (
                            <Loader2 className="mr-2 animate-spin" />
                        ) : (
                            "Apply for Business Account"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
