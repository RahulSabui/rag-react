import { useEffect, useState } from "react";
import api from "../api/axios";


export default function Chat() {

    const [messages, setMessages] = useState([]);

    const [question, setQuestion] = useState("");

    const [conversationId, setConversationId] = useState(null);


    // Create conversation when page loads
    useEffect(() => {

        createConversation();

    }, []);



    async function createConversation() {

        const response = await api.post(
            "/chat/conversation/create/",
            {
                title: "New Chat"
            }
        );


        const id = response.data.id;


        localStorage.setItem(
            "conversation_id",
            id
        );


        setConversationId(id);

    }



    async function sendMessage() {

        if (!question || !conversationId)
            return;


        const userMessage = {
            role: "user",
            content: question
        };


        setMessages(prev => [
            ...prev,
            userMessage
        ]);


        const response =
            await api.post(
                "/chat/",
                {
                    conversation_id:
                        conversationId,

                    question
                }
            );



        setMessages(prev => [
            ...prev,

            {
                role: "assistant",

                content:
                    response.data.answer,

                sources:
                    response.data.sources
            }

        ]);



        setQuestion("");

    }




    return (

        <div className="
            h-screen
            flex
            flex-col
            bg-gray-100
        ">


            <div className="
                flex-1
                overflow-y-auto
                p-6
            ">


                {
                    messages.map(
                        (msg, index) => (

                            <div
                                key={index}
                                className={`
                    mb-4
                    p-4
                    rounded-xl
                    max-w-xl

                    ${msg.role === "user"
                                        ?
                                        "bg-blue-600 text-white ml-auto"
                                        :
                                        "bg-white"
                                    }

                    `}
                            >


                                <p>
                                    {msg.content}
                                </p>



                                {
                                    msg.sources &&
                                    (
                                        <div className="
                        mt-3
                        text-xs
                        text-gray-500
                        ">

                                            Sources:

                                            {
                                                msg.sources.map(
                                                    (source, i) => (

                                                        <div key={i}>
                                                            {JSON.stringify(source)}
                                                        </div>

                                                    )
                                                )
                                            }

                                        </div>
                                    )
                                }


                            </div>

                        )
                    )
                }


            </div>




            <div className="
            p-4
            bg-white
            flex
            gap-3
            ">


                <input

                    value={question}

                    onChange={
                        e => setQuestion(
                            e.target.value
                        )
                    }


                    onKeyDown={
                        e => {
                            if (e.key === "Enter")
                                sendMessage()
                        }
                    }


                    placeholder="Ask your documents..."


                    className="
            flex-1
            border
            rounded-lg
            p-3
            "


                />



                <button

                    onClick={sendMessage}


                    className="
            bg-black
            text-white
            px-6
            rounded-lg
            "

                >

                    Send

                </button>



            </div>


        </div>

    )

}