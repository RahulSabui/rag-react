import {
    UploadCloud,
    FileText
} from "lucide-react";

import {
    useState
} from "react";

import api from "../api/axios";


export default function UploadBox({ onSuccess }) {

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");


    function handleFile(e) {
        setFile(e.target.files[0]);
    }


    async function uploadDocument() {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);

            const response = await api.post(
                "/documents/upload/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setMessage("Document uploaded successfully");
            if (onSuccess) {
                onSuccess();
            }

            console.log(response.data);
        } catch (error) {
            console.log(error);
            setMessage("Upload failed");
        } finally {
            setUploading(false);
        }
    }




return (

<div
className="
bg-white
rounded-2xl
shadow
p-6
"
>


<div
className="
flex
items-center
gap-3
mb-4
"
>

<UploadCloud
className="text-blue-600"
/>


<h2
className="
font-semibold
text-lg
"
>

Upload Knowledge

</h2>


</div>



<label

className="
border-2
border-dashed
border-gray-300
rounded-xl
h-40
flex
flex-col
items-center
justify-center
cursor-pointer
hover:border-blue-500
transition
"

>


<FileText
size={35}
className="text-gray-400"
/>



<p
className="
mt-2
text-gray-500
"
>

Choose PDF, TXT or DOCX

</p>



<input

type="file"

hidden

onChange={handleFile}

/>


</label>



{
file &&

<p
className="
mt-3
text-sm
text-gray-600
"
>

Selected:
{file.name}

</p>

}




<button

onClick={uploadDocument}

disabled={uploading}

className="
mt-5
w-full
bg-blue-600
text-white
py-3
rounded-xl
hover:bg-blue-700
"

>

{
uploading
?
"Uploading..."
:
"Upload Document"
}


</button>



{
message &&

<p
className="
mt-3
text-sm
text-center
"
>

{message}

</p>

}



</div>

)

}