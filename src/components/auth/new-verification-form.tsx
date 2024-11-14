"use client";
import { DotLoader } from "react-spinners";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/action/new-verificaton-action";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [succes, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const onClick = useCallback(() => {
    if (!token) {
      setError("Missing token");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onClick();
  }, [onClick]);

  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerLabel="Confirming your information"
    >
      <div className="w-full flex items-center justify-center">
        {!error && !succes && <DotLoader color="#1E3A8A" />}
        <FormError message={error} />
        <FormSuccess message={succes} />
      </div>
    </CardWrapper>
  );
};
