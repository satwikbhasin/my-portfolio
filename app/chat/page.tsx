"use client"
import { TextareaAutosize } from "@mui/material";
import { useState } from 'react';
import { Navigation } from "../components/nav";
import { MessageSquare, User, Mail, Phone, Send } from "lucide-react";
import { useForm } from '@formspree/react';
import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';
import './phoneField.css';


export default function ContactForm() {
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [state, handleSubmit] = useForm("mleqzvle");

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!isEmailValid(email)) {
            alert("Please enter a valid email address.");
            return;
        } else {
            await handleSubmit({
                message: message,
                name: name,
                email: email,
                phone: phone,
            });
            alert(`Message sent: ${message}`);
        };
    }

    const isEmailValid = (email: string) => {
        const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return regex.test(email);
    };

    return (
        <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
            <Navigation />
            <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
                <form
                    onSubmit={handleFormSubmit}
                >
                    <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-2 lg:gap-16">
                        <div id="message-field" className="flex flex-col gap-2">
                            <div className="text-white flex flex-row items-center gap-1"><MessageSquare
                                color="#6c6c74"
                                size={20}
                            />Message</div>
                            <TextareaAutosize
                                value={message}
                                minRows={6}
                                maxRows={5}
                                style={{
                                    flex: 1,
                                    overflow: "auto",
                                    color: "#6c6c74",
                                    backgroundColor: "#1f1f1f",
                                    border: "1px solid #6c6c74",
                                    padding: 10,
                                    borderRadius: 5,
                                }}
                                id="message"
                                name="message"
                                placeholder="Type your message here"
                                required={true}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-4" >
                            <div className="flex flex-col gap-1">
                                <div className="text-white flex flex-row items-center gap-1"><User
                                    color="#6c6c74"
                                    size={20}
                                />Name</div>
                                <input
                                    value={name}
                                    type="text"
                                    name="name"
                                    required={true}
                                    placeholder="Full Name"
                                    style={{
                                        overflow: "auto",
                                        color: "#6c6c74",
                                        backgroundColor: "#1f1f1f",
                                        padding: 10,
                                        borderRadius: 5,
                                        fontSize: "small"
                                    }}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="text-white flex flex-row items-center gap-1"><Mail
                                    color="#6c6c74"
                                    size={20}
                                />Email</div>
                                <input
                                    value={email}
                                    style={{
                                        overflow: "auto",
                                        color: "#6c6c74",
                                        backgroundColor: "#1f1f1f",
                                        padding: 10,
                                        borderRadius: 5,
                                        fontSize: "small"
                                    }}
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    required={true}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-white flex flex-row items-center gap-1"><Phone
                                    color="#6c6c74"
                                    size={20}
                                />Phone (optional)</div>
                                <PhoneInput
                                    value={phone}
                                    onChange={(phone) => setPhone(phone)}
                                    placeholder="Phone Number"
                                />
                                <input readOnly required={false} hidden value={phone} type="telephone" name="telephone"></input>
                            </div>
                            <div className="flex w-full justify-center items-center mt-3">
                                <button disabled={message.trim() === "" || email.trim() === "" || name.trim() === ""} type="submit" className="flex bg-zinc-300 rounded-lg p-2 gap-2 w-full justify-center items-center disabled:bg-zinc-700">Send<Send size={18} /></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}