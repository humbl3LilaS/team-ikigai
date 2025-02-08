"use client";
import { Input } from "@/components/ui/input";
import { ChangeEventHandler, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

type PasswordFieldProps = {
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: string;
};

const PasswordField = ({ onChange, value }: PasswordFieldProps) => {
    const [isPasswordField, setIsPasswordField] = useState(true);
    const onFieldTypeChange = () => {
        setIsPasswordField((prev) => !prev);
    };

    return (
        <div className={"relative"}>
            <Input
                value={value}
                onChange={onChange}
                placeholder={"Eg: SUpeR@1232"}
                type={isPasswordField ? "password" : "text"}
            />
            <Button
                className={"absolute right-6 top-1/2 -translate-y-1/2"}
                variant={"ghost"}
                type={"button"}
                onClick={onFieldTypeChange}
            >
                {isPasswordField ? <EyeOff /> : <Eye />}
            </Button>
        </div>
    );
};

export default PasswordField;
