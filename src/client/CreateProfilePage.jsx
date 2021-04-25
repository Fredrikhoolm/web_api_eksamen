import React, {useState} from "react";


export function CreateProfilePage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    async function submit(e) {
        e.preventDefault();
        console.log("Submitting", {firstName: firstName, lastName: lastName});
        await fetch("/api/profilePage", {
            method: "POST",
            body: JSON.stringify({firstName: firstName, lastName: lastName}),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    return <form onSubmit={submit}>
        <h1>Create new profile</h1>
        <div><label>First name: <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/></label></div>
        <div><label>Last name: <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/></label></div>

        <button>Submit</button>
    </form>;
}