import React, { useState } from "react";
import { useParams } from "react-router";
import { LoadingView } from "./LoadingView";
import { InputField } from "./InputField";
import { useLoading } from "./useLoading";
import { ErrorView } from "./ErrorView";

function EditProfileForm({  profilePage, onSubmit }) {
    const [firstName, setFirstName] = useState(profilePage.firstName);
    const [lastName, setLastName] = useState(profilePage.lastName);


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

    const { data: profile, loading, error, reload } = useLoading(
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

    if (loading || !profile) {
        return <LoadingView />;
    }

    return <EditProfileForm profile={profile} onSubmit={handleSubmit} />;
}
