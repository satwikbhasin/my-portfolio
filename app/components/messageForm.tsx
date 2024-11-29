"use client"
import { TextareaAutosize, Snackbar, Alert } from "@mui/material";
import { useState } from 'react';
import { MessageSquare, User, Mail, Phone, Send } from "lucide-react";
import { useForm } from '@formspree/react';
import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';
import '../styling/phoneField.css';
import { Card } from "./card";

export default function MessageForm() {
    const [formData, setFormData] = useState({ message: "", name: "", email: "", phone: "" });
    const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_TOKEN || "");
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
                await handleSubmit(formData);
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
        <div>
            <form
                onSubmit={handleFormSubmit}
                className="flex items-center justify-center pl-10 pr-10 sm:pl-32 sm:pr-32"
            >
                <div className="grid w-full grid-cols-1 xs:grid-cols-1 sm:mt-0 sm:grid-cols-1 md:grid-cols-3 lg:gap-5 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="flex flex-col gap-2 col-span-2 md:mr-5 mb-5 md:mb-0">
                        <div className="text-white flex flex-row items-center gap-2 font-kode-mono" style={{ fontSize: 15 }}><MessageSquare
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
                    <div className="flex flex-col gap-5 col-span-1 items-center w-full">
                        <div className="flex flex-col gap-1 w-full">
                            <div className="text-white flex flex-row items-center gap-2 font-kode-mono" style={{ fontSize: 15 }}>
                                <User
                                    size={20}
                                    className="text-sea-green"
                                />Name
                            </div>
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
                        <div className="flex flex-col gap-1 w-full">
                            <div className="text-white flex flex-row items-center gap-2 font-kode-mono" style={{ fontSize: 15 }}><Mail
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
                        <div className="flex flex-col gap-1 w-full">
                            <div className="text-white flex flex-row items-center gap-2 font-kode-mono" style={{ fontSize: 15 }}>
                                <Phone size={20} className="text-sea-green" />
                                Phone
                                <span style={{ fontSize: 10, fontStyle: "italic" }} className="text-text"> - optional </span>
                            </div>
                            <PhoneInput
                                value={formData.phone}
                                onChange={(phone) => setFormData({ ...formData, phone })}
                                defaultCountry="us"
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
                        <div style={{ position: "relative", marginTop: "20px", zIndex: 0, }} className="flex flex-col gap-1 w-full" >
                            <Card>
                                <button type="submit" className="flex text-sea-green rounded-lg p-2 gap-2 w-full justify-center items-center font-kode-mono">Send<Send size={18} /></button>
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
    );
}