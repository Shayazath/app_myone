import AsyncStorage from "@react-native-async-storage/async-storage"



export const saveRegistrationProgress = async (screenName, data) => {

    try {
        const key = `registration_progress_${screenName}`
        await AsyncStorage.setItem(key, JSON.stringify(data))
        console.log(`progress saved to ${screenName}`)
    } catch (err) {
        console.log("Error saving registration progress:", err)
    }
}

export const getRegistrationProgress = async (screenName) => {
    try {
        const key = `registration_progress_${screenName}`
        const data = await AsyncStorage.getItem(key)
        if (data !== null) {
            return JSON.parse(data)
        } else {
            console.log(`No progress saved for ${screenName}`)
            return null
        }
    } catch (err) {
        console.log("Error retrieving registration progress:", err)
        return null
    }
}