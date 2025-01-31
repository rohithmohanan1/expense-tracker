import { ResponseType, WalletType } from "@/types";
import { uploadFileToCloudinary } from "./imageServices";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export const createOrUpdateWallet = async (
    walletData: Partial<WalletType>
): Promise<ResponseType> => {
    try {
        let walletToSave = {...walletData}
        
        if(walletData.image){
            const imageUploadRes = await uploadFileToCloudinary(walletData.image, "wallets")

            if(!imageUploadRes.success) return { success: false, msg: imageUploadRes.msg || 'Failed to upload wallet icon'}

            walletToSave.image = imageUploadRes.data
        }

        if(!walletData?.id) {
            walletToSave.amount = 0
            walletToSave.totalIncome = 0
            walletToSave.totalExpenses = 0
            walletToSave.created = new Date()
        }

        const walletRef = walletData?.id ? doc(db, "wallets", walletData?.id) : doc(collection(db, 'wallets'))

        await setDoc(walletRef, walletToSave, { merge: true })

        return {success: true, data: {...walletToSave, id: walletRef.id}}

    } catch (error: any) {
        console.log('got error creating/updating wallet', error)
        return {success: false, msg: error.msg || "Could not create/update wallet"}
    }
}


export const deleteWallet = async (walletId: string): Promise<ResponseType> => {
    try {
        const walletRef = doc(db, 'wallets', walletId)
        await deleteDoc(walletRef)
        
        // todo: delete all transaction related to this wallet
        return { success: true, msg: "Wallet deleted successfully" }
    } catch (error: any) {
        console.log('Error deleting wallet: ', error)
        return { success: false, msg: error.message }
    }
}