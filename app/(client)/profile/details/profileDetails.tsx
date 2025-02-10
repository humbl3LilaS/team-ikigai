"use client";

import { CircleChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
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

import { updateUser } from "../actions/update-user-data";
import { IUser, regionCityMap } from "../userdata";

export default function ProfileDetails({ userinfo }: { userinfo: IUser }) {
    const [user, setUser] = useState(userinfo);
    const [editing, setEditing] = useState(false);

    const form = useForm({
        defaultValues: user,
    });

    const selectedRegion = form.watch("region");
    const filteredCity =
        regionCityMap[selectedRegion as keyof typeof regionCityMap] || [];

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
            setUser(data); // Update local state
            setEditing(false);
        } else {
            alert(response.message);
        }
    };

    return (
        <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow rounded">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <Button variant="link">
                        <Link href="/profile">
                            <CircleChevronLeft
                                style={{ width: "1.5rem", height: "1.5rem" }}
                                name="circle-chevron-left"
                            />
                        </Link>
                    </Button>

                    <h1 className="text-2xl font-bold">Profile Details</h1>
                </div>
            </div>

            <Form {...form}>
                <form className="space-y-4">
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
                                        value={user?.name ?? ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                                        value={user?.email ?? ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>PhoneNumber</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        readOnly={!editing}
                                        className={
                                            !editing
                                                ? "bg-gray-100 border-0 cursor-not-allowed"
                                                : ""
                                        }
                                        value={user.phoneNumber ?? ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        readOnly={!editing}
                                        className={
                                            !editing
                                                ? "bg-gray-100 border-0 cursor-not-allowed"
                                                : ""
                                        }
                                        value={user.address ?? ""}
                                    />
                                </FormControl>
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
                                    {editing ? (
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
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

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    {editing ? (
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
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
                <div className="flex justify-between mt-6">
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
    );
}
