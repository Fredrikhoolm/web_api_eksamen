import React, { useState } from "react";
import { useParams } from "react-router";
import { LoadingView } from "./LoadingView";
import { InputField } from "./InputField";
import { useLoading } from "./useLoading";
import { ErrorView } from "./ErrorView";

function EditProfileForm({  user, onSubmit }) {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);


    async function submit(e) {
        onSubmit(e, { firstName, lastName });
    }

    return (
        <form onSubmit={submit}>
            <h1>Edit an existing profile ({firstName})</h1>
            <InputField label={"First name"} value={firstName} onChangeValue={setFirstName} />
            <InputField label={"Last name"} value={lastName} onChangeValue={setLastName} />

            <button>Submit</button>
        </form>
    );
}

export function EditProfilePage({ profileApi }) {
    const { id } = useParams();

    const { data: user, loading, error, reload } = useLoading(
        async () => await profileApi.getProfile(id),
        [id]
    );

    async function handleSubmit(e, { firstName, lastName }) {
        e.preventDefault();
        await profileApi.updateProfile(id, { firstName, lastName });
    }

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }

    if (loading || !user) {
        return <LoadingView />;
    }

    return <EditProfileForm user={user} onSubmit={handleSubmit} />;
}
