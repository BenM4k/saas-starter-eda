"use client";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FieldType = "input" | "textarea" | "select";

type RHFFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  type?: HTMLInputElement["type"];
  fieldType?: FieldType;
  rows?: HTMLTextAreaElement["rows"];
  selectOptions?: {
    value: string;
    name: string;
  }[];
  disabled?: boolean;
};

export function CustomFormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  fieldType = "input",
  selectOptions,
  className,
  rows,
  disabled = false,
}: RHFFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

          {fieldType === "input" && (
            <Input
              id={name}
              className={className}
              {...field}
              type={type}
              placeholder={placeholder}
              required
            />
          )}

          {fieldType === "textarea" && (
            <Textarea
              id={name}
              className={className}
              rows={rows}
              {...field}
              placeholder={placeholder}
              required
            />
          )}

          {fieldType === "select" && (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className={className} disabled={disabled}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {selectOptions?.map((option) => (
                  <SelectItem value={option.value} key={option.name}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
}
