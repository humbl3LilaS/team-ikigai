"use client";

import { SendToBack } from "lucide-react";
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

import { IUser, placeholderUsers, regionCityMap } from "../userdata";

export default function DetailPage() {
    const [user, setUser] = useState(placeholderUsers[0]);
    const [editing, setEditing] = useState(false);

    const form = useForm({
        defaultValues: user,
    });

    const toggleEditing = () => {
        if (editing) {
            form.reset(user);
            setEditing(false);
        } else {
            setEditing(true);
        }
    };

    const onSubmit = (data: IUser) => {
        setUser(data);
        setEditing(false);
    };

    return (
        <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow rounded">
            <div className="flex justify-between items-center mb-4">
                <Button variant="link">
                    <Link href="/profile">
                        <SendToBack className="size-10" />
                    </Link>
                </Button>

                <h1 className="text-2xl font-bold">Profile Details</h1>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
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
                                            {/* <SelectContent>
                                                {filteredCity.map((city) => (
                                                    <SelectItem
                                                        key={city}
                                                        value={city}
                                                    >
                                                        {city}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent> */}
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
            </Form>

            <div className="flex justify-between mt-6">
                <Button onClick={toggleEditing} variant="outline">
                    {editing ? "Cancel" : "Edit"}
                </Button>
                {editing && (
                    <div className="flex justify-end">
                        <Button type="submit">Update</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
