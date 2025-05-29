import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ChevronLeft } from "lucide-react";
import { signIn } from "@/utils/Emailcontroller";

export const LoginEmail = () => {
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const { push } = useRouter();

  return (
    <div className="flex items-center justify-center">
      <div className="w-[416px] flex flex-col gap-5">
        <Button className="size-9 bg-[white] border">
          <ChevronLeft className="text-[black]" />
        </Button>
        <div>
          <h1 className="text-[24px] font-semibold">Log In</h1>
          <p className="text-4 text-[#71717A]">
            Log in to enjoy your favorite dishes.
          </p>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              await signIn(values);
              push("/");
            } catch (err: any) {
              setErrors({
                email: err.response?.data?.message || "Signup failed",
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <Field
                  as={Input}
                  name="email"
                  placeholder="Enter your email address"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  as={Input}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />

                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <Button
                className="h-9 px-8 bg-[#18181B] hover:opacity-25"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Let's Go"}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="flex items-center justify-center gap-3 text-[16px]">
          Don’t have an account?
          <p
            className="text-[#2563EB] hover:cursor-pointer"
            onClick={() => push("/signup")}
          >
            Sign Up
          </p>
        </div>
      </div>
    </div>
  );
};
