import {
    motion
} from "framer-motion";

import UploadBox from "./UploadBox";


export default function UploadModal({ close }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-[92vw] max-w-md"
            >
                <div className="rounded-2xl bg-white p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-bold">Upload</h2>
                        <button onClick={close}>✕</button>
                    </div>

                    <UploadBox onSuccess={close} />
                </div>
            </motion.div>
        </div>
    );
}