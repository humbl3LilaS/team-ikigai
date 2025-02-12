"use client";

import { CircleChevronLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
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
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { REGION, TOWNSHIPS } from "@/constants";

import { updateUser } from "../actions/update-user-data";
import { IUser } from "../type/usertype";
import { getUserData } from "../actions/get-user-data";
import Loading from "@/app/(client)/loading";
import { toast, useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type UserData = Awaited<ReturnType<typeof getUserData>>;

interface ProfileDetailsProps {
    userid: string;
}

export default function ProfileDetails({ userid }: ProfileDetailsProps) {
    const [user, setUser] = useState<NonNullable<UserData> | null>(null);
    const [editing, setEditing] = useState(false);

    // State for open status of each dropdown (region & city)
    const [regionOpen, setRegionOpen] = useState(false);
    const [cityOpen, setCityOpen] = useState(false);

    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<IUser>();

    useEffect(() => {
        async function loadUser() {
            const data = await getUserData(userid);
            if (data) {
                setUser(data);
                form.reset(data);
            }
        }
        loadUser();
    }, [userid, form]);

    if (!user) {
        return (
            <div>
                <Loading></Loading>
            </div>
        );
    }

    const selectedRegion = form.watch("region");
    const filteredCity =
        TOWNSHIPS[selectedRegion as keyof typeof TOWNSHIPS] || [];

    const toggleEditing = () => {
        if (editing) {
            form.reset(user);
            setEditing(false);
        } else {
            setEditing(true);
        }
    };

    const onSubmit = async (data: IUser) => {
        const response = await updateUser(user.id, data);
        if (response.success) {
            setUser({
                ...data,
                totalSpend: user.totalSpend,
                latestOrderStatus: user.latestOrderStatus,
            });
            setEditing(false);
            toast({
                title: "Update Successful",
                description: response.message,
            });
            router.push("/profile/details");
        } else {
            toast({
                title: "Update Failed",
                description: response.message,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="p-3 flex flex-col justify-center items-center">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/3 p-6 shadow rounded">
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
                        <h1 className="text-2xl font-bold">Profile Details</h1>
                    </div>
                </div>

                {/* Use a grid container for the form */}
                <Form {...form}>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name Field (will take one column) */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            readOnly={!editing}
                                            className={
                                                !editing
                                                    ? "bg-gray-100 border-0 cursor-not-allowed"
                                                    : ""
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email Field (will take one column) */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            readOnly={!editing}
                                            className={
                                                !editing
                                                    ? "bg-gray-100 border-0 cursor-not-allowed"
                                                    : ""
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Phone Number Field (one column) */}
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            readOnly={!editing}
                                            className={
                                                !editing
                                                    ? "bg-gray-100 border-0 cursor-not-allowed"
                                                    : ""
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Address Field (span two columns if desired) */}
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value ?? ""}
                                            readOnly={!editing}
                                            placeholder="Enter your address"
                                            className={
                                                !editing
                                                    ? "bg-gray-100 border-0 cursor-not-allowed"
                                                    : ""
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Region Field Using Radix DropdownMenu (one column) */}
                        <FormField
                            control={form.control}
                            name="region"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Region</FormLabel>
                                    <FormControl>
                                        {editing ? (
                                            <DropdownMenu
                                                onOpenChange={setRegionOpen}
                                            >
                                                <DropdownMenuTrigger asChild>
                                                    <div className="relative w-full cursor-pointer">
                                                        <Input
                                                            readOnly
                                                            value={
                                                                field.value ||
                                                                ""
                                                            }
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
                                                                field.onChange(
                                                                    region,
                                                                )
                                                            }
                                                            className="w-full cursor-pointer px-3 py-2 hover:bg-gray-100"
                                                        >
                                                            {region}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        ) : (
                                            <p className="bg-gray-100 p-2 rounded">
                                                {field.value || "N/A"}
                                            </p>
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* City Field Using Radix DropdownMenu (one column) */}
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        {editing ? (
                                            <DropdownMenu
                                                onOpenChange={setCityOpen}
                                            >
                                                <DropdownMenuTrigger asChild>
                                                    <div className="relative w-full cursor-pointer">
                                                        <Input
                                                            readOnly
                                                            value={
                                                                field.value ||
                                                                ""
                                                            }
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
                                                        filteredCity.map(
                                                            (city) => (
                                                                <DropdownMenuItem
                                                                    key={city}
                                                                    onSelect={() =>
                                                                        field.onChange(
                                                                            city,
                                                                        )
                                                                    }
                                                                    className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                                                                >
                                                                    {city}
                                                                </DropdownMenuItem>
                                                            ),
                                                        )
                                                    ) : (
                                                        <DropdownMenuItem
                                                            disabled
                                                            className="cursor-not-allowed px-3 py-2 text-gray-400"
                                                        >
                                                            Select a region
                                                            first
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        ) : (
                                            <p className="bg-gray-100 p-2 rounded">
                                                {field.value || "N/A"}
                                            </p>
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>

                    <div className="flex justify-between mt-6 md:col-span-2">
                        <Button onClick={toggleEditing} variant="outline">
                            {editing ? "Cancel" : "Edit"}
                        </Button>
                        {editing && (
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    onClick={form.handleSubmit(onSubmit)}
                                >
                                    Update
                                </Button>
                            </div>
                        )}
                    </div>
                </Form>
            </div>
        </div>
    );
}
