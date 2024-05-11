"use client"
import { TextareaAutosize, Snackbar, Alert } from "@mui/material";
import { useState } from 'react';
import { Navigation } from "../components/nav";
import { MessageSquare, User, Mail, Phone, Send } from "lucide-react";
import { useForm } from '@formspree/react';
import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';
import './phoneField.css';
import { Card } from "../components/card";

import { testUndoSend } from "./test";

export default function MessageForm() {
    const [formData, setFormData] = useState({ message: "", name: "", email: "", phone: "" });
    const [state, handleSubmit] = useForm("mleqzvle");
    const [showMessageSentAlert, setShowMessageSentAlert] = useState(false);
    const [showEmailInvalidAlert, setShowEmailInvalidAlert] = useState(false);
    const [showMessageNotSentAlert, setShowMessageNotSentAlert] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!isEmailValid(formData.email)) {
            setShowEmailInvalidAlert(true);
        } else {
            setShowMessageSentAlert(true);
            resetForm();
            const id = window.setTimeout(async () => {
                setShowEmailInvalidAlert(false);
                setShowMessageSentAlert(false);
                setShowMessageNotSentAlert(false);
                // await handleSubmit(formData);
                testUndoSend(formData);
            }, 6000);
            setTimeoutId(id);
        };
    }

    const resetForm = () => {
        setFormData({ message: "", name: "", email: "", phone: "" });
    }

    const isEmailValid = (email: string) => {
        const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return regex.test(email);
    };

    const undoSend = (
        <button onClick={() => {
            setShowMessageSentAlert(false);
            setShowMessageNotSentAlert(true);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        }}>
            UNDO
        </button>
    );

    return (
        <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
            <Navigation />
            <div className="container flex items-center justify-center min-h-screen mx-auto">
                <form
                    onSubmit={handleFormSubmit}
                    className="container flex items-center justify-center min-h-screen px-4 mx-auto"
                >
                    <div className="grid w-full grid-cols-1 p-5 gap-5 mx-auto mt-32 xs:grid-cols-1 sm:mt-0 sm:grid-cols-1 md:grid-cols-1 lg:gap-5 lg:grid-cols-2 xl:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <div className="text-white flex flex-row items-center gap-2"><MessageSquare
                                size={20}
                                className="text-sea-green"
                            />Message</div>
                            <TextareaAutosize
                                value={formData.message}
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
                                    fontSize: "small",
                                    width: "100%"
                                }}
                                className="font-kode-mono placeholder-input"
                                id="message"
                                name="message"
                                placeholder="Type your message here"
                                required={true}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-5 items-center" >
                            <div className="flex flex-col w-3/4 gap-1 xs:w-1/3 sm:w-1/2 md:w-1/2 lg:w-full xl:w-3/4">
                                <div className="text-white flex flex-row items-center gap-2"><User
                                    size={20}
                                    className="text-sea-green"
                                />Name</div>
                                <input
                                    value={formData.name}
                                    type="text"
                                    name="name"
                                    required={true}
                                    placeholder="Full Name"
                                    style={{
                                        overflow: "auto",
                                        color: "#6c6c74",
                                        backgroundColor: "#1f1f1f",
                                        border: "1px solid #6c6c74",
                                        padding: 10,
                                        borderRadius: 5,
                                        width: "100%",
                                        fontSize: "small",
                                    }}
                                    className="font-kode-mono placeholder-input"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col w-3/4 gap-1 xs:w-1/3 sm:w-1/2 md:w-1/2 lg:w-full xl:w-3/4">
                                <div className="text-white flex flex-row items-center gap-2"><Mail
                                    size={20}
                                    className="text-sea-green"
                                />Email</div>
                                <input
                                    value={formData.email}
                                    style={{
                                        overflow: "auto",
                                        color: "#6c6c74",
                                        backgroundColor: "#1f1f1f",
                                        border: "1px solid #6c6c74",
                                        padding: 10,
                                        borderRadius: 5,
                                        width: "100%",
                                        fontSize: "small"
                                    }}
                                    className="font-kode-mono placeholder-input"
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    required={true}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col w-3/4 gap-1 xs:w-1/3 sm:w-1/2 md:w-1/2 lg:w-full xl:w-3/4">
                                <div className="text-white flex flex-row items-center gap-2"><Phone
                                    size={20}
                                    className="text-sea-green"
                                />Phone (optional)</div>
                                <PhoneInput
                                    value={formData.phone}
                                    onChange={(phone) => setFormData({ ...formData, phone })}
                                    defaultCountry="US"
                                    placeholder="Phone Number"
                                    inputStyle={{
                                        width: "100%",
                                        color: "#6c6c74",
                                    }}
                                    className="gap-1 font-kode-mono placeholder-input"
                                    style={{
                                        border: "1px solid #6c6c74",
                                        borderRadius: 5,
                                        zIndex: 1,
                                    }}
                                    required={false}
                                />
                            </div>
                            <div style={{ position: "relative", marginTop: "20px", zIndex: 0, }} className={`flex flex-col w-3/4 gap-1 xs:w-1/2 sm:w-1/2 md:w-1/2 lg:w-full xl:w-3/4`} >
                                <Card>
                                    <button type="submit" className="flex text-sea-green rounded-lg p-2 gap-2 w-full justify-center items-center">Send<Send size={18} /></button>
                                </Card>
                                {showMessageSentAlert && (
                                    <Snackbar
                                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                        onClose={() => { setShowMessageSentAlert(false) }}
                                        open={showMessageSentAlert}
                                        autoHideDuration={6000}
                                        action={undoSend}
                                        message="Message Sent"
                                        style={{ position: 'absolute', top: '120%' }}
                                    />
                                )}
                                {showEmailInvalidAlert && (
                                    <Snackbar
                                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                        onClose={() => { setShowEmailInvalidAlert(false) }}
                                        open={showEmailInvalidAlert}
                                        autoHideDuration={6000}
                                        message="Invalid Email Address"
                                        style={{ position: 'absolute', top: '120%' }}
                                    />
                                )}
                                {showMessageNotSentAlert && (
                                    <Snackbar
                                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                        onClose={() => { setShowMessageNotSentAlert(false); }}
                                        open={showMessageNotSentAlert}
                                        autoHideDuration={6000}
                                        message="Message not sent"
                                        style={{ position: 'absolute', top: '120%' }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}