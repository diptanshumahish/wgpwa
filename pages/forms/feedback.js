import { getAuth } from "firebase/auth"
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { doc, setDoc, getFirestore, Timestamp } from 'firebase/firestore';
import moment from 'moment';
import Router from "next/router";
import { useState } from "react";

export default function Feedback() {
    const auth = getAuth();
    const db = getFirestore();
    const router = Router;
    const [clicked, changeClick] = useState('1');

    //variables that will store the data to be inputted
    var feedback = '';
    var name = '';
    var mom = moment().format('Do MMMM  YYYY,h:mm:ss a ')
    async function update() {
        setDoc(doc(db, "Feedback", `${auth.currentUser.email} + ${mom}`), {
            Name: name,
            Feedback: feedback,
            SubmissionDate: Timestamp.now(),
            submittedBy: auth.currentUser.email
        }, { merge: true, mergeFields: true }).then(() => {
            router.push('/workpage')
        })
    }
    return (
        <div >
            <Head>
                <title>Feedback @WG</title>
            </Head>
            <div>
                <Link href='/workpage'>
                    <div id="genback">
                        ← Feedback Form
                    </div>
                </Link>
                <div id="mainFormArea">
                    <div id="form">
                        <div className="formEle">
                            Name
                        </div>
                        <input type="text" id="candName" className="formInp" placeholder="Enter name" onChange={() => {
                            name = document.getElementById("candName").value;
                        }} />

                        <div className="formEle">
                            Feedback
                        </div>
                        <textarea id="candCom" className="formInp" placeholder="Enter your feedback here" onChange={() => {
                            feedback = document.getElementById("candCom").value;
                        }} />
                        <button className="formBut" onClick={() => {
                            changeClick('0.6');
                            update();


                        }} style={{ opacity: clicked }} >Submit</button>
                        <div id="helpp">(After succcesful form submission you wil be redirected back to the Work Page)</div>
                    </div>
                    <div id="formImage">
                        <Image src='/assets/feedback.svg' width={500} height={500} alt='feedback' />
                    </div>
                </div>
            </div>
        </div>
    )
}