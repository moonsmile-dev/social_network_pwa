import axios from 'axios';

export const useStorage = async (bucket: string, key: string, file: any): Promise<{ error: any, data: any }> => {
    var formData = new FormData();
    formData.append("file", file)
    formData.append("key", key)
    formData.append("bucket", bucket)

    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SN_STORAGE_API}/files/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return { error: null, data: res.data }
    } catch (error: any) {
        return { error: error, data: null }
    }

}

